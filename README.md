<b><h2>The problem PeerStreams solves</b></h2>
It is a Live Streaming Platform build on Livepeer for content creators , Events , Shows , Live classes and many more.

Youtube Timestamps :
Link : https://youtu.be/H3WPV93_5uo
Introduction : 0:08 - 2:56
Live Site Demo : 3:10
SuperFluid demo : 6:18 to 7:11
LivePeer Video Nfts: 8:20 to 10:00

Superfluid's Usecase:
-> We believe in Pay as You Watch model so for every second you watch stream ,money is being deducted from your account and deposited into the Streamers Account when you decide to leave the stream.
-> We didn't went with a SUBSCRIPTION model because people generally regret buying a subs or forgets about it .

LivePeer's Usecase :
-> The streamer can stream using Livepeer using the StreamID and the Stream URL which we are generating in our platform and then give that URL and ID to OBS and then the stream will be started.
Why LivePeer ?
-> Startups are consequently compelled to charge their users by selling their data, torment them with adverts, or cease operations altogether.
-> Livepeer also provides support in uploading video to IPFS so streamer can directly upload his streamed video which will live on the network endlessely.
-> Further we have written a smart contract to mint that video Nft to the user's Wallet Address.

Covalent's Usecase:
-> We have used covalent to fetch all Livepeer video Nfts streamer has minted after stream ends.
-> Further we also plan to show Nfts which user holds in their wallet.

ENS Usecase :
-> We are Showing all the Wallet Address who are Subscribers of the Streamer and we are not showing their Wallet Address insted we are showing their ENS names(for those who have a ENS).
IPFS usecase :
-> IPFS is used to store Video Nfts of streamers which they select to store on the network.

Push Usecase(future):
-> User can Join a Streaamers Channel,See All his Notifis,See all Channels of PUSH , Join/Disjoin a Channel.
-> Streamer can see his Subscriber's ENS and NFT Profile,

<b><h2>Challenges we ran into</b></h2>
->We tried to Deploy Superfluid on Filecoin VM and Shardeum but were facing some hurdles in it.
-> Getting the asset id after stream ends and minting it was a hard task for us but we conquered it as a team effort.
->The Remix was not able to detect Shardeum network even once after several trials and hence we had to deploy on Polygon for making our Dapp work.
->Filecoin VM is quite new and it was good to explore it with the help of the Mentor .
