# Backend Services
Backend service monorepo for [Leetcode Roulette](https://leetcoderoulette.com) api. This project follows a microservices architecture.

> API hosted at https://api.leetcoderoulette.com

### Getting Started
To get started running the services locally, clone the repository to your local machine and change to the project root directory. Next, change to the service(s) you'd like to run's root directory and read the `README` file for specific instructions.

### Features
* Users can sync their Leetcode profile to retrieve their profile information.
* Users can get a list of Leetcode questions including their current completion status.
* Users can retrieve a list of all Leetcode tags.
* Users can search up another synced users information by their username.

```
git clone https://github.com/leetcode-roulette/backend-services.git
cd backend-services
```

### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /sync | To sync a users Leetcode profile |
| POST | /logout | To logout of a session |
| GET | /v1/ | To retrieve the currently authenticated users information |
| GET | /v1/users/:username | To retrieve a user by their username |
| GET | /v1/tags | To retrieve a list of all available Leetcode tags |
| GET | /v1/questions | To retrieve a list of all available Leetcode questions |
| GET | /v1/questions/:titleSlug | To retrieve a question by its title slug |

### Authors
* [Eric Hicks](https://github.com/hicks8989)
* [Jared Ivory](https://github.com/jared-ivory)

### License
This project is available for use under the MIT License.
