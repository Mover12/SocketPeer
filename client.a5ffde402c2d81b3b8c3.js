(()=>{"use strict";const e=class{constructor(e){this.peer=e.peer,this.wss=e.wss,this.wss.addEventListener("message",(async e=>{const t=JSON.parse(e.data);if("offer"==t.event){const e=await this.peer.createAnswer(t.data.uid,t.data.sdp);this.wss.send(JSON.stringify({event:"sdp",data:{uid:t.data.uid,sdp:e}}))}else"answer"==t.event&&await this.peer.setAnswer(t.data.uid,t.data.sdp)}))}connect(e){this.wss.send(JSON.stringify({event:"connect",data:{uid:e}}))}async open(e){const t=await this.peer.createOffer(e);this.wss.send(JSON.stringify({event:"sdp",data:{uid:e,sdp:t}}))}};class t extends EventTarget{constructor(e){super();for(const t of e)this.init(t)}init(e){Object.defineProperty(this,`on${e}`,{set(t){this.on(e,t)}})}on(e,t){this.addEventListener(e,t)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t}))}}const n=t,s=class extends n{constructor(e){super(["open","message","close"]),this.id=e,this.peerConnections={},this.dataChannels={}}async createOffer(e){this.peerConnections[e]=new RTCPeerConnection,this.dataChannels[e]=await this.peerConnections[e].createDataChannel(e),this.setupPeerConnection(e),this.setupDataChannel(e);const t=await this.peerConnections[e].createOffer();return await this.peerConnections[e].setLocalDescription(t),await new Promise(((t,n)=>{this.peerConnections[e].onicecandidate=n=>{t(this.peerConnections[e].localDescription)}}))}async createAnswer(e,t){this.peerConnections[e]=new RTCPeerConnection,this.peerConnections[e].addEventListener("datachannel",(t=>{this.dataChannels[e]=t.channel,this.setupDataChannel(e)})),this.setupPeerConnection(e),await this.peerConnections[e].setRemoteDescription(t);const n=await this.peerConnections[e].createAnswer();return await this.peerConnections[e].setLocalDescription(n),n}async setAnswer(e,t){await this.peerConnections[e].setRemoteDescription(t)}setupPeerConnection(e){this.peerConnections[e].addEventListener("connectionstatechange",(t=>{"disconnected"!=t.target.connectionState&&"failed"!=t.target.connectionState||this.close(e)}))}setupDataChannel(e){this.dataChannels[e].addEventListener("open",(t=>{this.emit("open",e,t)})),this.dataChannels[e].addEventListener("message",(t=>{this.emit("message",e,t)}))}close(e){this.peerConnections[e]&&(this.dataChannels[e].close(),this.peerConnections[e].close(),delete this.dataChannels[e],delete this.peerConnections[e])}send(e,t){this.dataChannels[e].send(JSON.stringify(t))}},i=(8,Array.from(Array(8),(()=>Math.floor(16*Math.random()).toString(16))).join(""));const a=document.querySelector(".hash"),o=document.querySelector(".input-ws"),c=document.querySelector(".connect"),r=document.querySelector(".example-ws"),d=document.querySelector(".input-hash"),h=document.querySelector(".open");a.innerHTML=i,c.addEventListener("click",(()=>{const t=new e({peer:new s(i),wss:new WebSocket(`ws://${o.value}`)});t.wss.onopen=()=>{t.connect(a.innerHTML)},h.addEventListener("click",(()=>{t.open(d.value)})),t.peer.onopen=e=>{console.log("OPEN")}})),r.addEventListener("click",(()=>{o.value=r.innerHTML}))})();