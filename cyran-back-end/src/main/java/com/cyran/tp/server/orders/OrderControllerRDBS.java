package com.cyran.tp.server.orders;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
 * Managing user and storing information about him
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
     * Method for inserting product
     *
     * @param request - request for registration
     * @param body - body of post request with all order information
     * @param response - response which should be send back
     * @return string that confirms of product insertion, otherwise denial of it
     * @throws InterruptedException
     * @throws ParseException
     */
	@RequestMapping(path = "/eorder/insert", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin
    public String createOrder(HttpServletRequest request, @RequestBody String body, HttpServletResponse response) throws InterruptedException, ParseException {
        
		String productName;
		JSONObject product;
		BoughtProducts boughtProduct;
		Products originalProduct;
		Orders savedOrder;
		
		JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(body);
        String userName = (String) obj.get("userName");
        String shipmentAddress= (String) obj.get("shipmentAddress");
        JSONArray products = (JSONArray) ((JSONObject) obj.get("cartInfo")).get("products");
		
		JSONObject creditCard = (JSONObject) obj.get("creditCardInfo");
		String iban = (String) creditCard.get("iban");
		String valid = (String) creditCard.get("valid");
		String cvc = (String) creditCard.get("cvc");
		CreditCard creditCardInstance = cardsRepository.getCreditCard(iban);
		Users user = usersRepository.getByName(userName);
		if(creditCardInstance == null){
			cardsRepository.insertCreditCard(iban, valid, cvc);
			creditCardInstance = cardsRepository.getCreditCard(iban);
		}
		if(user == null){
			System.out.println("User is null!");
		}
		
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
				boughtProduct.setPrice((Double) product.get("price"));
				boughtProduct.setQuantity((Long) product.get("quantity"));
				boughtProductsRepository.save(boughtProduct);
			} else {
				System.out.println("Non existent product!");
			}
		}
 
		return "Order is successfully created";
    }
}
