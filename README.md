# 🤙🏻 My Stack

My Stack gives you the possibility to share your technical skills in an easy manner with the world.

## Getting Started

1. Clone the repository by running `git clone https://github.com/jarmee/my-stack.git`
2. Open the root folder of this project and run `npm install`

### Starting the API

3. After all dependencies were installed execute `docker-compose up`. This will startup the NoSQL database (MongoDB).
4. Now you are ready to start the api. Run `nx serve api` and you are good to go. To see if everything is up and running open your browser and navigate to `http://localhost:3000/skills` or run `curl http://localhost:3000/skills`. You should see the following output `[]`;

### Starting the Client

5. To Start the client SPA carry out the following command `nx serve client`. The SPA should be reachable under `http://localhost:4200`.
