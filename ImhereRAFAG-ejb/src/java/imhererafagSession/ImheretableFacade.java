/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package imhererafagSession;

import imhererafagEntity.Imheretable;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author RAFAG (Refka - Amira - Francis - Awa - Ghita )
 */
@Stateless
public class ImheretableFacade extends AbstractFacade<Imheretable> implements ImheretableFacadeLocal {
    @PersistenceContext(unitName = "ImhereRAFAG-ejbPU")
    private EntityManager em;

    protected EntityManager getEntityManager() {
        return em;
    }

    public ImheretableFacade() {
        super(Imheretable.class);
    }
    
    // Test
    
    @Override
    public void ecrirePosition(int id, double longitude, double latitude, String tinyurl) {

        Imheretable ut = new Imheretable (id);
        
        ut.setLatitude(latitude);
        ut.setLongitude(longitude);
        ut.setTinyurl(tinyurl);
        
        create(ut);
     
    }
    
    @Override
    public Imheretable lirePosition(String tinyurl) {

        Imheretable ut = new Imheretable ();
        List <Imheretable> testuser = findAll();
        
        for(Imheretable u : testuser){
                if(u.getTinyurl().equals(tinyurl)){
                    ut = u;
                                       
                }
        }
        
        return ut;
    }
    
    
}
