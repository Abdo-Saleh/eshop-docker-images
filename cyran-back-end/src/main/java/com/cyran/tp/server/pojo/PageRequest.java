package com.cyran.tp.server.pojo;

/**
 * Class for creating request to page
 *
 * @author Viktor Matovic
 */
public class PageRequest {

    String path;
    String accessingUser;

    /**
     * Sets path to page
     *
     * @param path - new path to page
     */
    public void setPath(String path) {
        this.path = path;
    }

    /**
     * Returns path to page
     *
     * @return path
     */
    public String getPath() {
        return path;
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
