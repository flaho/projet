/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WebServices;

import imhererafagEntity.Imheretable;
import imhererafagSession.ImheretableFacadeLocal;
import java.util.List;
import javax.ejb.EJB;
import javax.jws.Oneway;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

/**
 *
 * @author RAFAG (Refka - Amira - Francis - Awa - Ghita )
 */
@WebService(serviceName = "WebServices")
public class WebServices {
    @EJB
    private ImheretableFacadeLocal ejbRef;// Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Web Service Operation")

    @WebMethod(operationName = "create")
    @Oneway
    public void create(@WebParam(name = "imheretable") Imheretable imheretable) {
        ejbRef.create(imheretable);
    }

    @WebMethod(operationName = "edit")
    @Oneway
    public void edit(@WebParam(name = "imheretable") Imheretable imheretable) {
        ejbRef.edit(imheretable);
    }

    @WebMethod(operationName = "remove")
    @Oneway
    public void remove(@WebParam(name = "imheretable") Imheretable imheretable) {
        ejbRef.remove(imheretable);
    }

    @WebMethod(operationName = "find")
    public Imheretable find(@WebParam(name = "id") Object id) {
        return ejbRef.find(id);
    }

    @WebMethod(operationName = "findAll")
    public List<Imheretable> findAll() {
        return ejbRef.findAll();
    }

    @WebMethod(operationName = "findRange")
    public List<Imheretable> findRange(@WebParam(name = "range") int[] range) {
        return ejbRef.findRange(range);
    }

    @WebMethod(operationName = "count")
    public int count() {
        return ejbRef.count();
    }

    @WebMethod(operationName = "ecrirePosition")
    @Oneway
    public void ecrirePosition(
                                @WebParam(name = "id") int id,
                                @WebParam(name = "longitude") double longitude, 
                                @WebParam(name = "latitude") double latitude, 
                                @WebParam(name = "tinyurl") String tinyurl) {
        ejbRef.ecrirePosition(id, longitude, latitude, tinyurl);
    }

    @WebMethod(operationName = "lirePosition")
    public Imheretable lirePosition(@WebParam(name = "tinyurl") String tinyurl) {
        return ejbRef.lirePosition(tinyurl);
    }
    
}
