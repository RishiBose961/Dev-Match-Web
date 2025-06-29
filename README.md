
<br/>
<div align="center">

<h3 align="center">DevMatch</h3>
<p align="center">
DevMatch is unique because it fills a real gap: it’s a developer-first, real-time, collaboration and matchmaking tool — not another portfolio site or coding playground, but a place where devs can instantly meet, code, and grow together.
<br/>
<br/>
<a href="https://github.com/RishiBose961/Dev-Match-Web"><strong>Explore the docs »</strong></a>

  


</p>
</div>

## About The Project

![Product Screenshot](https://firebasestorage.googleapis.com/v0/b/rishibose1901-f5ff6.appspot.com/o/Untitled%20design.png?alt=media&token=4f80058d-f2ea-4b65-a6cf-a0eae788013d)

Learn from each other
2
Build small projects or solve problems as a pair
Build small projects or solve problems as a pair
3
Code together (live in the browser)
Code together (live in the browser)
### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [React](https://reactjs.org)
- [Node](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/try/download/community?msockid=0a6c41a7a61064fc250857a2a71665d6)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.
### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```
### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = "ENTER YOUR API";
   ```


Directory structure:
├── README.md
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── avatarNames.json
│   ├── components
│   │   ├── AudioComp
│   │   │   ├── AudioControls.tsx
│   │   │   ├── ParticipantList.tsx
│   │   │   └── RoomHeader.tsx
│   │   ├── DashBoard_Info
│   │   │   ├── DashBoardCreate.tsx
│   │   │   └── DashBoardInfo.tsx
│   │   ├── Find_Dev
│   │   │   ├── Avatar.tsx
│   │   │   └── ProfileAvatar.tsx
│   │   ├── Follow
│   │   │   └── FollowButton.tsx
│   │   ├── Header
│   │   │   ├── Bottomavigation.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── NavBar.tsx
│   │   │   └── SideBar.tsx
│   │   ├── Join_Req
│   │   │   └── datetime-picker.tsx
│   │   ├── PrivateRoute.tsx
│   │   ├── Register
│   │   │   ├── Details.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── PersonalInfo.tsx
│   │   ├── Room_Info
│   │   │   ├── AcceptedButton.tsx
│   │   │   └── Room_Info.tsx
│   │   ├── Scheduling
│   │   │   ├── CreateSchedule.tsx
│   │   │   ├── MainTab.tsx
│   │   │   ├── PendingRequest.tsx
│   │   │   ├── ScheduleSession.tsx
│   │   │   ├── TimeRange.tsx
│   │   │   └── UpcomingSession.tsx
│   │   ├── Setting
│   │   │   ├── SettingAbout_Skill.tsx
│   │   │   ├── SettingAvatar.tsx
│   │   │   ├── SettingExperience.tsx
│   │   │   └── SettingProfile.tsx
│   │   ├── mode-toggle.tsx
│   │   ├── recommadation
│   │   │   └── Recom_Dev.tsx
│   │   ├── theme-provider.tsx
│   │   ├── ui
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── tooltip.tsx
│   │   └── useAuthEffect.tsx
│   ├── hook
│   │   ├── GetAccepted
│   │   │   └── Getacceptedhook.tsx
│   │   ├── GetJoinRequest
│   │   │   └── GetJoinRequestById.tsx
│   │   ├── VideoHook
│   │   │   └── VideoHook.tsx
│   │   ├── audiohook
│   │   │   └── useAudioRoom.ts
│   │   ├── getAllUser
│   │   │   └── GetAllUser.tsx
│   │   ├── getAvaliable
│   │   │   ├── GetAvaliHook.tsx
│   │   │   ├── GetAvaliableById.tsx
│   │   │   └── GetOnline.tsx
│   │   ├── getDashboard
│   │   │   └── GetDashBoardHook.tsx
│   │   ├── getNotify
│   │   │   ├── UseNotification.tsx
│   │   │   └── UsePullNotify.tsx
│   │   ├── getRecommation
│   │   │   └── UseDevlopHook.tsx
│   │   ├── getRoom
│   │   │   ├── GetJjoinRoom.tsx
│   │   │   └── GetRoomJoin.tsx
│   │   ├── getTimeSchedulling
│   │   │   ├── GetScheduleEvery.tsx
│   │   │   ├── GetScheduleId.tsx
│   │   │   └── GetTimeSchedule.tsx
│   │   └── getUserById
│   │       └── GetUserId.tsx
│   ├── hooks
│   │   └── use-mobile.ts
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── Audio-Space
│   │   │   ├── Audio-Space.tsx
│   │   │   ├── AudioChat.tsx
│   │   │   ├── AudioRoom.tsx
│   │   │   └── JoinRoom.tsx
│   │   ├── Dashboard
│   │   │   └── DashBoard.tsx
│   │   ├── NotFound
│   │   │   └── NotFound.tsx
│   │   ├── Room
│   │   │   └── Room.tsx
│   │   ├── Setting
│   │   │   └── setting.tsx
│   │   ├── Video-Meeting
│   │   │   ├── Participant.tsx
│   │   │   └── VideoMeeting.tsx
│   │   ├── auth
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── find_devs
│   │   │   ├── Devs.tsx
│   │   │   ├── Main_Find_Devs.tsx
│   │   │   └── Search_Find_Devs.tsx
│   │   ├── home
│   │   │   └── Home.tsx
│   │   ├── join_Request
│   │   │   └── JoinRequest.tsx
│   │   ├── notification
│   │   │   ├── Notication.tsx
│   │   │   └── PullNotify.tsx
│   │   ├── profile
│   │   │   └── Profile.tsx
│   │   ├── pull_request
│   │   │   ├── AcceptedButton.tsx
│   │   │   └── PullRequest.tsx
│   │   └── schedule
│   │       └── Schedule.tsx
│   ├── slice
│   │   └── authSlice.ts
│   ├── store.ts
│   ├── types
│   │   └── index.ts
│   ├── vite-env.d.ts
│   └── zustland
│       └── notifypullStore.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!


- [Github](https://github.com/RishiBose961)
- [Rishi Bose](https://rishibose.fun/)
