import certificates from '../data/certificates.json'

export const get_certificates = () => {
    return new Promise ((resolve, reject) =>{
            resolve(certificates)
    })
}