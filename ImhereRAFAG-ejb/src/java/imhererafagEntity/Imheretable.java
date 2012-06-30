/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package imhererafagEntity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author RAFAG (Refka - Amira - Francis - Awa - Ghita )
 */
@Entity
@Table(name = "Imheretable")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Imheretable.findAll", query = "SELECT i FROM Imheretable i"),
    @NamedQuery(name = "Imheretable.findById", query = "SELECT i FROM Imheretable i WHERE i.id = :id"),
    @NamedQuery(name = "Imheretable.findByLongitude", query = "SELECT i FROM Imheretable i WHERE i.longitude = :longitude"),
    @NamedQuery(name = "Imheretable.findByLatitude", query = "SELECT i FROM Imheretable i WHERE i.latitude = :latitude"),
    @NamedQuery(name = "Imheretable.findByTinyurl", query = "SELECT i FROM Imheretable i WHERE i.tinyurl = :tinyurl")})
public class Imheretable implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "longitude")
    private Double longitude;
    @Column(name = "latitude")
    private Double latitude;
    @Size(max = 45)
    @Column(name = "tinyurl")
    private String tinyurl;

    public Imheretable() {
    }

    public Imheretable(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String getTinyurl() {
        return tinyurl;
    }

    public void setTinyurl(String tinyurl) {
        this.tinyurl = tinyurl;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Imheretable)) {
            return false;
        }
        Imheretable other = (Imheretable) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "imhererafagEntity.Imheretable[ id=" + id + " ]";
    }
    
}
