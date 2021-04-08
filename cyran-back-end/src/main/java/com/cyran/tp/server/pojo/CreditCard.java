package com.cyran.tp.server.pojo;

/**
 * Class for creating credit card entity
 *
 * @author Viktor Matovic
 */
public class CreditCard {

    private String IBAN;
    private String valid;
    private String cvc;
    
    /**
     * Sets iban of payers account
     *
     * @param IBAN - new IBAN
     */
    public void setIBAN(String IBAN) {
        this.IBAN = IBAN;
    }
    
    /**
     * Sets validity of payers card
     *
     * @param valid - new valid
     */
    public void setValid(String valid) {
        this.valid = valid;
    }
    
    /**
     * Sets CVC code of payers bank card
     *
     * @param cvc - new cvc
     */
    public void setCvc(String cvc) {
        this.cvc = cvc;
    }

    /**
     * Returns iban of payers card
     *
     * @return IBAN
     */
    public String getIBAN() {
        return IBAN;
    }
    /**
     * Returns validity attribute of payers card
     *
     * @return valid
     */
    public String getValid() {
        return valid;
    }
    /**
     * Returns cvc code of payers card
     *
     * @return cvc
     */
    public String getCvc() {
        return cvc;
    }
}
