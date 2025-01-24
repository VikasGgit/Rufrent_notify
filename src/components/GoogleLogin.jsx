import React, { useRef, useState } from 'react'
import firebase from '../firebase'

const GoogleLogin = () => {
  const [phoneNumber, setPhoneNumber] =useState('')
  const [verificationId, setVerificationId] =useState('')
  const recaptchaRef=useRef(null)


  const handleSentOtp=() => {

    if(recaptchaRef.current){
      recaptchaRef.current.innerHTML='<div id="recaptcha-container" ></div>'
    }
     const verifier= new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size:"normal"
     })

     firebase.auth().signInWithPhoneNumber(phoneNumber,verifier)
     .then(confiremationRes=>{
      setVerificationId(confiremationRes.verificationId)
      console.log("confiremationRes", confiremationRes)
     })
     .catch(error=>{
      console.log("error: " , error)
     })
  }
  return (
   <>
    <h1>GoogleLogin</h1>
    <div ref={recaptchaRef} ></div>
    <input type='tel'
    placeholder='+9198989898989'
    value={phoneNumber}
    onChange={e=>setPhoneNumber(e.target.value)}
/>
<button onClick={handleSentOtp}>Send Otp</button>
    </> 
  )
}

export default GoogleLogin