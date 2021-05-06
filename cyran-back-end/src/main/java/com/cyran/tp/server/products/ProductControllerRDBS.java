package com.cyran.tp.server.products;

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

import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import org.hibernate.HibernateException;
import org.hibernate.Transaction;
import org.hibernate.SQLQuery;
import org.hibernate.Criteria;

import java.io.IOException;

import java.util.Date;
import java.util.Properties;
import javax.mail.Session;


/**
 * Managing user and storing information about him
 *
 * @author Jakub Perdek
 */
@RestController
public class ProductControllerRDBS {


    @Autowired
    private ProductsRepository productsRepository;
	
	

	/**
     * Method for registering user
     *
     * @param request - request for registration
     * @param body - body of post request with email, name and hashed form of password
     * @param response - response which should be send back
     * @return string that confirms of user registration, otherwise denial of it
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     * @throws HibernateException
     */
	@RequestMapping(path = "/firstProducts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin
	public ProductsDTO[] getFirstProducts(HttpServletRequest request, @RequestParam Integer count, HttpServletResponse response) throws InterruptedException {
		if(count == null){
			count = new Integer(6);
		}
        Products[] products = productsRepository.getFirstProducts(count);
		return ProductsUtils.productsToDtoMapping(products);
    }

	/**
     * Method for registering user
     *
     * @param request - request for registration
     * @param body - body of post request with email, name and hashed form of password
     * @param response - response which should be send back
     * @return string that confirms of user registration, otherwise denial of it
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     * @throws HibernateException
     */
	@RequestMapping(path = "/product/insert", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin
    public String createProduct(HttpServletRequest request, @RequestBody String body, HttpServletResponse response) throws InterruptedException, ParseException {
        
		JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(body);
        String name = (String) obj.get("name");
        String description = (String) obj.get("description");
        String url = (String) obj.get("url");
		Double price;
		
		if(obj.get("price") instanceof Long){
			price = (Double) ((Long)obj.get("price")).doubleValue();
		} else {
			price = (Double) obj.get("price");
		}
		
        Products newProduct = new Products();
        newProduct.setName(name);
        newProduct.setDescription(description);
        newProduct.setUrl(url);
		newProduct.setPrice(price);
        productsRepository.save(newProduct);

		return "Product successfully created";
    }

	/**
     * Method for updating product
     *
     * @param request - request for registration
     * @param body - body of post request with email, name and hashed form of password
     * @param response - response which should be send back
     * @return string that confirms of user registration, otherwise denial of it
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     * @throws HibernateException
     */
	@RequestMapping(path = "/product/update", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin
    public String updateProduct(HttpServletRequest request, @RequestBody String body, HttpServletResponse response) throws InterruptedException, ParseException {

		JSONParser parser = new JSONParser();
		JSONObject obj = (JSONObject) parser.parse(body);
		String name = (String) obj.get("name");
		String description = (String) obj.get("description");
		String url = (String) obj.get("url");
		Double price;
		
		if(obj.get("price") instanceof Long){
			price = (Double) ((Long)obj.get("price")).doubleValue();
		} else {
			price = (Double) obj.get("price");
		}
		Products product = productsRepository.getProductAccordingName(name);
		
		if(description != null && description != ""){
			product.setDescription(description);
		}
		if(url != null && url != ""){
			product.setUrl(url);
		}
		product.setPrice(price);
		productsRepository.updateProduct(product.getName(), product.getDescription(), product.getUrl(), product.getPrice());
	   
       return "product successfully updated";
    }
	
	
}
