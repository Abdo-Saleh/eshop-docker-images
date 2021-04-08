package com.cyran.tp.server.priviledges;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.MediaType;

import javassist.NotFoundException;
import java.util.List;



import com.cyran.tp.server.priviledges.PriviledgesRepository;

/**
 * Controller for managing operations with priviledges
 *
 * @author Jakub Perdek
 */
@RestController
public class PriviledgesController {
	
	@Autowired
    private PriviledgesRepository priviledgesRepository;

	/**
	 * Gets user priviledges according id
	 *
	 * @param priviledgeId - id of requesting priviledge
	 * @param priviledgesRepository - instance of priviledge repository
	 * @return priviledge string - role in eshop
	 */
	public static String getUserPriviledgesAccrodingId(Integer priviledgeId, PriviledgesRepository priviledgesRepository){
		if(priviledgeId == null){
			return "user";
		} else {
			return priviledgesRepository.findPriviledgeById(priviledgeId).getPriviledge();
		}			
	}

	/**
	 * Gets user priviledge id according priviledge name
	 *
	 * @param priviledgeName - priviledge string - role in eshop
	 * @param priviledgesRepository - instance of priviledge repository
	 * @return id of requesting priviledge
	 */
	public static Integer getUserPriviledgeIdAccrodingPriviledgeName(String priviledgeName, PriviledgesRepository priviledgesRepository){
		Priviledges priviledges = priviledgesRepository.findPriviledgeByName(priviledgeName);
		if(priviledges == null){
			return 0;
		} else {
			return priviledges.getId();
		}			
	}
}
