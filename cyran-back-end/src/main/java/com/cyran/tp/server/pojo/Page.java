package com.cyran.tp.server.pojo;


/**
 * Class for creating Page entity
 *
 * @author Peter Spusta
 */
public class Page {

    String pageName;
    String token;
    String accessingUser;

    /**
     * Sets name of page 
     *
     * @param pageName - new name of page
     */
    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    /**
     * Returns name of page 
     *
     * @return pageName
     */
    public String getPageName() {
        return pageName;
    }

    /**
     * Sets token for access
     *
     * @param token - new access token
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * Returns token for access
     *
     * @return token
     */
    public String getToken() {
        return this.token;
    }

    /**
     * Sets user who is accessing website
     *
     * @param accessingUser - new accessing user by name
     */
    public void setAccessingUser(String accessingUser) {
        this.accessingUser = accessingUser;
    }

    /**
     * Returns user who is accessing website 
     *
     * @return accessingUser
     */
    public String getAccessingUser() {
        return accessingUser;
    }
}
