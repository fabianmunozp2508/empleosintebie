"use strict";(self.webpackChunknobleui_angular=self.webpackChunknobleui_angular||[]).push([[592],{6698:(b,p,s)=>{s.d(p,{O:()=>h});var d=s(5861),f=s(4004),c=s(9260),i=s(4650),_=s(1289),u=s(5763);let h=(()=>{class n{constructor(e,o){this.afs=e,this.authService=o,this.jobOffersCollection=e.collection("josofferts"),this.jobOffers$=this.jobOffersCollection.snapshotChanges().pipe((0,f.U)(r=>r.map(t=>{const a=t.payload.doc.data();return{id:t.payload.doc.id,...a}})))}setUserId(e){this.userId=e,this.jobOffersCollection=this.afs.collection("josofferts",o=>o.where("applicants","array-contains",this.userId))}getApplicantJobOffers(){return this.jobOffersCollection.snapshotChanges().pipe((0,f.U)(e=>e.map(o=>{const r=o.payload.doc.data();return{id:o.payload.doc.id,...r}})))}deleteApplicantJobOffer(e){return this.afs.collection("josofferts").doc(e).update({applicants:c.Z.firestore.FieldValue.arrayRemove(this.userId)})}getJobOfferById(e){return this.afs.collection("josofferts").doc(e).valueChanges()}getJobOffers(){return this.jobOffers$}addJobOffer(e){var o=this;return(0,d.Z)(function*(){const r=yield o.authService.getUserId();return e.userId=r,o.jobOffersCollection.add(e)})()}applyJobOffer(e,o){const r=this.afs.collection("josofferts",t=>t.where("docId","==",e)).doc(e);return console.log(`Retrieving job offer: ${e}`),r.get().toPromise().then(t=>{const a=t.data();if(!a)return console.warn(`Job offer ${e} not found`),null;if(console.log(`Job offer retrieved: ${e}`),a.applicants&&a.applicants.includes(o))return console.warn(`User ${o} has already applied to job offer ${e}`),null;const l=a.applicants?[...a.applicants,o]:[o];return console.log(`Updating job offer: ${e} with applicants:`,l),r.update({applicants:l})}).catch(t=>{throw console.error("Error applying to job offer:",t),t})}deleteApplicantJobOfferByUser(e,o){return this.afs.collection("josofferts").doc(e).update({applicants:c.Z.firestore.FieldValue.arrayRemove(o)})}deleteJobOffer(e){return this.afs.collection("josofferts").doc(e).delete()}}return n.\u0275fac=function(e){return new(e||n)(i.LFG(_.ST),i.LFG(u.K))},n.\u0275prov=i.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()}}]);