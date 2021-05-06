package com.cyran.tp.server.orders;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

/**
 * Credit cards repository for making query to cards table
 *
 * @author Jakub Perdek
 */
public interface CardsRepository extends JpaRepository<CreditCard, Integer>, JpaSpecificationExecutor<CreditCard> {

    
	/**
     *  Selects card according iban
     *
     * @param iban - iban of the card
     * @return credit card with given iban
     */
    @Query(value = ("SELECT * FROM cards WHERE iban = ?1 LIMIT 1"), nativeQuery = true)
    CreditCard getCreditCard(String iban);
	
	/**
     * Inserts new credit card to databse
     *
     * @param iban - iban for a card
     * @param valid - validation code for card
     * @param cvc - cvc code for a card
     */
    @Query(value = ("INSERT INTO cards(iban, valid, cvc) VALUES (?1, ?2, ?3)"), nativeQuery = true)
    @Modifying
    @Transactional
    void insertCreditCard(String iban, String valid, String cvc);
	
    /**
     * Gets all credit cards
     * @return all credit cards from database
     */
    List<CreditCard> findAll();
}
