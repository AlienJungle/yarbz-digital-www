---
title: Developing a speech processing proof-of-concept for Averbis
type: work
image: /portfolio-images/averbis.jpg
backgroundImage: /portfolio-images/averbis-cover.jpg
client: Averbis
date: Mon Nov 01 2021 00:00:00 GMT+0100 (British Summer Time)
excerpt: Find out how we designed and developed a prototype browser-based solution so Averbis could interact with their speech processing service.
testimonial: 1-averbis
---

## Brief

Averbis approached me looking for help implementing their Speech 2 Structure service on the web. On the surface, the task was a simple one. The back-end had already been developed, and they needed a way to interact with their service on the browser by using a user's microphone. The user would enable their microhpone, give a description of their current symtpoms, and the service would attempt to provide diagnoses, identify vital parameters and suggest medication to treat the user.

## Understanding the problem

With a clear brief and some initial research, we spent time some trying to understand the technical limitation at play. The back-end service provided an interface (API) through which clients (websites and mobile apps) could communicate and interact with it using a technology called gRPC.

For those unfamiliar with what gRPC is or what is does, [the official gRPC](https://grpc.io/) site gives the following definition:

> gRPC is a modern open source high performance Remote Procedure Call (RPC) framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication. It is also applicable in last mile of distributed computing to connect devices, mobile applications and browsers to backend services.

...a lot of words to describe what is, in a nutshell, a super cool and modern way to connect things together.

However, because gRPC is fairly modern technology and the web moves slowly, browser support for the specific feature we needed to make things work (bi-directional gRPC streaming between a browser and the existing gRPC server) wouldn't be a simple plug-and-play solution this time around.

## Planning

After understanding the technologies used and any techninical limitations, we could get on with planning a solution. My immediate consideration was "how do we normally establish a real-time, two-way connection between a browser and a server?"

The answer? **Websockets!**

Using a typical websocket connection, a real-time, two-way connection could be established between a proxy socket server and the browser. The proxy server would establish a bi-directional gRPC connection between itself and the gRPC server, and would pass incoming websocket data along. Once the gRPC server responded, the proxy server would pass data back on the same socket connection.

![a diagram displaying the networking relationship between the browser, the proposed websocket proxy server and the existing gRPC server](https://ik.imagekit.io/alienjungle/alienjungle_digital/averbis-flow_NKMoEVWRw.png?ik-sdk-version=javascript-1.4.3&updatedAt=1645726532605)

We drew the above diagram and sent it to Averbis with a description of how all these parts fit together. They loved the solution, and so it was time to get cracking with the build!

## The build

For the build, we chose to write the browser prototype using Angular, and chose nodejs with socket.io for websocket server implementation. These were easy choices to make as they are popular technologies that we have worked with before.

Having never used bi-directional gRPC streaming before, there was a fair bit of research and learning involved, but the learning curve wasn't too steep, and both me and Averbis are pleased with the end result.

## Delivery

Once everything was working nicely on my end, we threw the browser prototype and the websocket proxy server into their own repos and sent them off to Averbis. After spending some time tying their production server into the prototype (we were using a dummy server while the production server was being worked on) they reported that everything was working as expected.
