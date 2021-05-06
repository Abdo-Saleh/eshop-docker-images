package com.cyran.tp.server.orders;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;

import javassist.NotFoundException;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.ParseException;

import org.hibernate.HibernateException;
import org.hibernate.Transaction;
import org.hibernate.SQLQuery;
import org.hibernate.Criteria;

import java.io.IOException;

import com.cyran.tp.server.users.UsersRepository;
import com.cyran.tp.server.users.Users;
import com.cyran.tp.server.products.Products;
import com.cyran.tp.server.products.ProductsRepository;

/**
 * Managing order creation and other manipulation with order
 *
 * @author Jakub Perdek
 */
@RestController
public class OrderControllerRDBS {


    @Autowired
    private OrdersRepository orderRepository;

	@Autowired
    private CardsRepository cardsRepository;
	
	@Autowired
    private UsersRepository usersRepository;
	
	@Autowired
    private ProductsRepository productsRepository;
	
	@Autowired
    private BoughtProductsRepository boughtProductsRepository;
	
	/**
     * Method for creating order
     *
     * @param request - request for creation order
     * @param body - body of post request with all order information
     * @param response - response which should be send back
     * @return JSON with all products or only information that order is created
     * @throws InterruptedException for interruptions
     * @throws ParseException if parsing request JSON body went wrong
     */
	@RequestMapping(path = "/eorder/insert", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin
    public JsonNode createOrder(HttpServletRequest request, @RequestBody String body, HttpServletResponse response) throws InterruptedException, ParseException {
        
		String productName;
		JSONObject product;
		BoughtProducts boughtProduct;
		Products originalProduct;
		Orders savedOrder;
		Double finalPrice, price;
		ObjectMapper mapper = new ObjectMapper();
        ObjectNode objectNode = mapper.createObjectNode();
		JsonNode result;
		String iban, valid, cvc;
		ArrayList<Products> product_list = new ArrayList<Products>();
		
		
		JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(body);
        String userName = (String) obj.get("userName");
        String shipmentAddress= (String) obj.get("shipmentAddress");
		JSONObject cartInfo = (JSONObject) obj.get("cartInfo");
        JSONArray products = (JSONArray) cartInfo.get("products");
		
		JSONObject creditCard = (JSONObject) obj.get("creditCardInfo");
		
		if(creditCard.get("iban") instanceof Long){
			iban = ((Long)creditCard.get("iban")).toString();
		} else {
			iban = (String) creditCard.get("iban");
		}	
	
		valid = (String) creditCard.get("valid");
		cvc = (String) creditCard.get("cvc");
		CreditCard creditCardInstance = cardsRepository.getCreditCard(iban);
		Users user = usersRepository.getByName(userName);
		if(creditCardInstance == null){
			cardsRepository.insertCreditCard(iban, valid, cvc);
			creditCardInstance = cardsRepository.getCreditCard(iban);
		}
		if(user == null){
			System.out.println("User is null!");
		}
		
		finalPrice = (Double) cartInfo.get("finalPrice");
		Orders newOrder = new Orders();
        newOrder.setShipmentAddress(shipmentAddress);
        newOrder.setUser(user);
        newOrder.setCreditCard(creditCardInstance);
		savedOrder = orderRepository.saveAndFlush(newOrder);
		
		Iterator productsIterator = products.iterator();
		while(productsIterator.hasNext()) {
			product = (JSONObject) productsIterator.next();
			boughtProduct = new BoughtProducts();
			
			productName = (String) product.get("name");
			originalProduct = productsRepository.getProductAccordingName(productName);
			if(originalProduct != null){
				
				boughtProduct.setProduct(originalProduct);
				boughtProduct.setOrder(savedOrder);
				
				if(product.get("price") instanceof Long){
					price = (Double) ((Long)product.get("price")).doubleValue();
				} else {
					price = (Double) product.get("price");
				}	
				boughtProduct.setPrice(price);
				
				boughtProduct.setQuantity((Long) product.get("quantity"));
				product_list.add(originalProduct);
				boughtProductsRepository.save(boughtProduct);
			} else {
				System.out.println("Non existent product!");
			}
		}
		
		if(finalPrice == 0){
			objectNode.put("success", true);
            objectNode.put("payed", true);
            objectNode.put("toPay", 0);
			ArrayNode prodArray = mapper.valueToTree(product_list);
            objectNode.putArray("products").addAll(prodArray);
            result = mapper.createObjectNode().set("order", objectNode);
		} else {
			objectNode.put("success", true);
            objectNode.put("payed", false);
            objectNode.put("toPay",  finalPrice);
            objectNode.put("products", "");
			result = mapper.createObjectNode().set("order", objectNode);
		}
		
        return result;
    }
}
