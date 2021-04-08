package com.cyran.tp.server;

import java.util.UUID;
import java.util.concurrent.ExecutionException;

import com.cyran.tp.server.api.BackendAPI;
import com.cyran.tp.server.pojo.*;
import com.cyran.tp.server.users.Users;
import com.cyran.tp.server.users.UsersRepository;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// TODO: send credentials in a more secure way
@RestController
public class UserController {

    @Autowired
    BackendAPI userService;

    @Autowired
    UsersRepository usersRepository;

    // curl -i -X GET http://localhost:8080/getUser?name=martin
    @CrossOrigin
    @GetMapping("/getUser")
    public User getUser(@RequestParam String name) throws InterruptedException, ExecutionException {
        return userService.getUser(name);
    }

    // curl -i -X GET http://localhost:8080/getProduct?name=tomato
    @CrossOrigin
    @GetMapping("/getProduct")
    public Product getProduct(@RequestParam String name) throws InterruptedException, ExecutionException {
        return userService.getProduct(name);
    }

    // curl -i -X POST -H 'Content-Type: application/json' -d '{"forUser": "viktor", "order": "plane", "description":
    // "boeing", "price": 1000000, "quantity": 1, "URL": "https://boeing.com/planes/niceplane.html"}'
    // http://localhost:8080/order
    @CrossOrigin
    @PostMapping(path = "/order", consumes = "application/json", produces = "application/json")
    public String orderProduct(@RequestBody UserOrderRequest userRequest)
            throws ExecutionException, InterruptedException {
        return userService.addOrder(userRequest);
    }

    // curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "mark", "password": "zuckerberg123"}'
    // localhost:8080/register
    @CrossOrigin
    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterUserRequest userRequest)
            throws ExecutionException, InterruptedException {
        return userService.registerUser(userRequest);
    }

    /*
     * curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "lemon", "description": "just a lemon",
     * "quantity": 1, "price": 1.30, "URL": "lemon.com/lemon"}' localhost:8080/create/product
     */
    @CrossOrigin
    @RequestMapping(value = "/create/product", consumes = "application/json", produces = "application/json", method = RequestMethod.POST)
    public String createProduct(@RequestBody ProductRequest createProductRequest)
            throws ExecutionException, InterruptedException {
        return userService.createProduct(createProductRequest);
    }

    /*
     * curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "cucumber", "description": "yummy cucumber",
     * "quantity": 1, "price": 1.30, "URL": "lemon.com/lemon"}' localhost:8080/update/product
     */
    @CrossOrigin
    @RequestMapping(value = "/update/product", consumes = "application/json", produces = "application/json", method = RequestMethod.POST)
    public String updateProduct(@RequestBody ProductRequest updateProductRequest)
            throws ExecutionException, InterruptedException {
        return userService.updateProduct(updateProductRequest);
    }

    /*
     * curl -i -X POST -H 'Content-Type: application/json' -d '{"id": 8, "userName": "Viktor", "shipmentAddress":
     * "between Earth and Moon", "cartInfo": {"products": [{ "name": "orange", "description": "orange orange", "url":
     * "orange.com", "quantity": 1, "price": 2 }], "finalPrice": 2 }, "creditCardInfo": {"iban": 348346, "valid":
     * "24/11/2020", "cvc": "000"} }' localhost:8080/create/order
     */
    @CrossOrigin
    @RequestMapping(value = "/create/order", consumes = "application/json", produces = "application/json", method = RequestMethod.POST)
    public JsonNode  createOrder(@RequestBody OrderRequest orderRequest) throws ExecutionException, InterruptedException {
        return userService.createOrder(orderRequest);
    }

    // curl --header "Content-Type: application/json" --request POST --data '{"path": "luxurious-staff",
    // "accessingUser": "johny depp"}' localhost:8080/getToken
    @CrossOrigin
    @RequestMapping(value = "/getToken", consumes = "application/json", produces = "application/json", method = RequestMethod.POST)
    public String getCSRFToken(@RequestBody PageRequest accessingPage) throws ExecutionException, InterruptedException {
        Page page = new Page();
        page.setPageName(accessingPage.getPath());
        page.setAccessingUser(accessingPage.getAccessingUser());
        page.setToken(UUID.randomUUID().toString());
        userService.savePage(page);
        return " csrf token: " + page.getToken();
    }

    @CrossOrigin
    @RequestMapping(value = "/check-token", consumes = "application/json", produces = "application/json", method = RequestMethod.POST)
    public String checkToken(@RequestBody Page accessingPage) throws ExecutionException, InterruptedException {
        if (userService.getTokenForPage(accessingPage) != null
                && userService.getTokenForPage(accessingPage).contains(accessingPage.getToken())) {
            return " ok";
        } else {
            return " possible csrf attack";
        }
    }

    @CrossOrigin
    @RequestMapping(value = "/getPriviledge", consumes = "application/json", produces = "application/json", method = RequestMethod.POST)
    public String getPriviledge(@RequestBody Users user) {
        for (Users us : usersRepository.findAll()) {
            if (us.getName().equals(user.getName())) {
                return us.getRole().getPriviledge();
            }
        }
        return "user-not-known";
    }

}
