/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package imhererafagSession;

import imhererafagEntity.Imheretable;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author RAFAG (Refka - Amira - Francis - Awa - Ghita )
 */
@Local
public interface ImheretableFacadeLocal {

    void create(Imheretable imheretable);

    void edit(Imheretable imheretable);

    void remove(Imheretable imheretable);

    Imheretable find(Object id);

    List<Imheretable> findAll();

    List<Imheretable> findRange(int[] range);

    int count();
    
    // Test 
    
    public void ecrirePosition(int id, double longitude, double latitude, String tinyurl);
    
    public Imheretable lirePosition(String tinyurl);
    
}
