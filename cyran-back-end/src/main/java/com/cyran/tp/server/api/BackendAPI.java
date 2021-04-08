package com.cyran.tp.server.api;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import com.cyran.tp.server.pojo.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.cloud.firestore.SetOptions;
import org.springframework.stereotype.Service;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;


/**
 * Class serving firebase database
 *
 * @author Peter Spusta
 */
@Service
public class BackendAPI {

    private static final String USERS = "com/cyran/tp/server/users";
    private static final String PRODUCTS = "products";
    private static final String ORDERS = "orders";
    private static final String PAGES = "pages";

    /**
	 * Sets id of order added to database, adds new order to firebase database
	 *
	 * @param userRequest - user order request
	 * @return updated string - returns information that order is added to database
	 */
    public String addOrder(UserOrderRequest userRequest) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference doc = dbFirestore.collection(USERS).document(userRequest.getForUser());
        User user = doc.get().get().toObject(User.class);
        List<Product> products = user.getProducts();
        boolean found = false;
        for (Product product : products) {
            if (product.getName().equals(userRequest.getOrder())) {
                product.setName(userRequest.getOrder());
                product.setDescription(userRequest.getDescription());
                product.setQuantity(userRequest.getQuantity());
                product.setURL(userRequest.getURL());
                product.setPrice(userRequest.getPrice());
                found = true;
                break;
            }
        }
        if (!found) {
            Product newOrder = new Product();
            newOrder.setName(userRequest.getOrder());
            newOrder.setQuantity(userRequest.getQuantity());
            newOrder.setDescription(userRequest.getDescription());
            newOrder.setURL(userRequest.getURL());
            newOrder.setPrice(userRequest.getPrice());
            products.add(newOrder);
        }
        user.setProducts(products);
        doc.set(user, SetOptions.merge());
        return "updated";
    }

    /**
	 * Adding new user to firebase via process of user registration
	 *
	 * @param userRequest - user  request
	 * @return information string - returns information if new user is succeffuly added to database
	 */
    public String registerUser(final RegisterUserRequest userRequest) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference doc = dbFirestore.collection(USERS).document(userRequest.getName());
        if (!doc.get().get().exists()) {
            User newUser = new User();
            newUser.setUserName(userRequest.getName());
            newUser.setPassword(userRequest.getPassword());
            doc.create(newUser);
            return "{\"success\":1,\"message\":\"registered\"}";
        }
        return "{\"success\":0,\"message\":\"no such user or user already exists\"}";
    }

    public void savePage(final Page accessingPage) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference doc = dbFirestore.collection(PAGES).document(accessingPage.getToken());
        if (!doc.get().get().exists()) {
            Page p = new Page();
            p.setToken(accessingPage.getToken());
            p.setAccessingUser(accessingPage.getAccessingUser());
            p.setPageName(accessingPage.getPageName());
            doc.create(p);
        } else {
            doc.update("accessingUser", accessingPage.getAccessingUser(), "token", accessingPage.getToken(), "pageName",
                    accessingPage.getPageName());
        }
    }

    public String getTokenForPage(final Page accessingPage) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(PAGES).document(accessingPage.getToken());
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        documentReference.get().get().toObject(Page.class);

        String patient;

        if (document.exists()) {
            Page pageInDB = document.toObject(Page.class);
            patient = document.toObject(Page.class).getToken();
            if (accessingPage.getPageName().equals(pageInDB.getPageName())
                    && accessingPage.getAccessingUser().equals(pageInDB.getAccessingUser()))
                return patient;
            return null;
        } else {
            return null;
        }
    }

    public static double getRandomIntegerBetweenRange(double min, double max) {
        double x = (int) (Math.random() * ((max - min) + 1)) + min;
        return x;
    }

    public JsonNode createOrder(final OrderRequest orderRequest) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference doc = dbFirestore.collection(ORDERS)
                .document(String.valueOf(getRandomIntegerBetweenRange(13, 30000)));
        Order order = new Order();
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode objectNode = mapper.createObjectNode();
        ArrayList<Product> products = new ArrayList<Product>();

        if (!doc.get().get().exists()) {
            order.setUserName(orderRequest.getUserName());
            order.setShipmentAddress(orderRequest.getShipmentAddress());
            order.setCartInfo(orderRequest.getCartInfo());
            order.setCreditCard(orderRequest.getCreditCardInfo());
            doc.create(order);
            if (orderRequest.getCartInfo().getFinalPrice() == 0) {
                orderRequest.getCartInfo().getProducts().forEach(p -> {try {
					products.add(this.getProduct(p.getName()));
				} catch (InterruptedException | ExecutionException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}});
                objectNode.put("success", true);
                objectNode.put("payed", true);
                objectNode.put("toPay", 0);
                ArrayNode prodArray = mapper.valueToTree(products);
                objectNode.putArray("products").addAll(prodArray);
                JsonNode result = mapper.createObjectNode().set("order", objectNode);
                return result;
            } else {
                objectNode.put("success", true);
                objectNode.put("payed", false);
                objectNode.put("toPay",  order.getCartInfo().getFinalPrice());
                objectNode.put("products", "");
                JsonNode result = mapper.createObjectNode().set("order", objectNode);
                return result;
            }
        }
        objectNode.put("success", false);
        objectNode.put("payed", false);
        objectNode.put("toPay", 0);
        objectNode.put("products", "");
        JsonNode result = mapper.createObjectNode().set("order", objectNode);
        return result;
    }

    public User getUser(String name) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(USERS).document(name);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        documentReference.get().get().toObject(User.class);

        User patient;

        if (document.exists()) {
            patient = document.toObject(User.class);
            return patient;
        } else {
            return null;
        }
    }

    public Product getProduct(String byName) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(PRODUCTS).document(byName);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        documentReference.get().get().toObject(Product.class);

        Product patient;

        if (document.exists()) {
            patient = document.toObject(Product.class);
            return patient;
        } else {
            return null;
        }
    }

    public String createProduct(ProductRequest createProductRequest) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference doc = dbFirestore.collection(PRODUCTS).document(createProductRequest.getName());
        if (!doc.get().get().exists()) {
            Product product = new Product();
            product.setName(createProductRequest.getName());
            product.setDescription(createProductRequest.getDescription());
            product.setQuantity(createProductRequest.getQuantity());
            product.setPrice(createProductRequest.getPrice());
            product.setURL(createProductRequest.getURL());
            doc.create(product);
            return "product created";
        }
        return "product not created";
    }

    public String updateProduct(ProductRequest updateProductRequest) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference doc = dbFirestore.collection(PRODUCTS).document(updateProductRequest.getName());
        if (!doc.get().get().exists())
            return "no such product";
        doc.update("name", updateProductRequest.getName(), "description", updateProductRequest.getDescription(), "URL",
                updateProductRequest.getURL(), "quantity", updateProductRequest.getQuantity(), "price",
                updateProductRequest.getPrice());
        return "product data updated";
    }
}
