package com.cyran.tp.server;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.junit.Assert.*;

import com.cyran.tp.server.api.BackendAPI;

@RunWith(SpringRunner.class)
@WebMvcTest(value = UserController.class)
public class ServerApplicationTests {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private BackendAPI backendAPI;

    @Test
    public void orderPlane() throws Exception {
        String inputJson = "{\"forUser\": \"viktor\", \"order\": \"plane\"}";
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/order")
                .accept(MediaType.APPLICATION_JSON).content(inputJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }

}

