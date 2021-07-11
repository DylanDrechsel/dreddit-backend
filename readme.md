<p align="center">
  <img src='https://user-images.githubusercontent.com/78124357/125202523-f53b7c00-e241-11eb-91e5-8af500b64e77.gif' />
</p>

---

Dreddit is a Reddit clone that allows users to have all the same CRUD functionality that one would have on Reddit. Users must create an account to get authenticated and once created are able to sign in and use the functionality of Dreddit. Users can create and edit posts, upload images, comment on other users’ posts, save post for later that they are able to access, and I even implemented the upvote/downvote system that Reddit has. I tried to make the HTML and CSS in Dreddit look as much as Reddit as possible. Post pictures you want people to see or use Dreddit as an outlet to talk about all your passions. All are welcome here!

Deployed Backend: <a href="https://boiling-shelf-57510.herokuapp.com/">Dreddit Backend</a> <br />
Deployed Frontend: <a href="https://master.dvzb15cl8s3db.amplifyapp.com/">Dreddit!</a> (NOTE: Please give the backend dyno a minute to start up on sign in)

## Dreddit Backend:
Dreddit Backend is a REST API that stores and returns social media data for my website Dreddit. I used Postgresql as my database with Prisma as my ORM. I used Express to set up my server through Nodejs. All routes were tested on Postman before deploying to the frontend.

## Key Features:
- Used Amazons aws-sdk along with S3 to allow users to upload pictures to Dreddit while being hosted on Amazon S3 
- Used bcrypt to keep users password secure by hashing them before they are stored in the database
- Used cookie-parser to attached the JWT to the cookies header and deliver it to the frontend
- Used dotenv to keep secret variables for jsonwebtoken and AWS hidden from Github 
- Used cors to allow deployed frontend to communicate with the backend
- Used multer to allow users to upload and store pictures in my postgresql database (NOTE: Had to remove this and replace with storing pictures on Amazon S3 because of an issue with Heroku. Code is still in repo but just commented out. If you wish to test just comment it back in and used the route for creating a post with the comment 'MULTER' above it.) 

## Next Steps:
- "Top" and "Hot" routes that will sort the Post response by which post are the most popular or had the most interactions
- Allowing Users to Comment on other users Comments
- User gets a notification when one of their post has been interacted with

## If you would like to test Multer or change things around:

- Fork and Clone this repository
- Run `npm i` in the directory
- Run `node server.js` in the directory
- Open in your favorite code editor
- Test with Postman

## Response for a Post with all its information
```
{
    "posts": [
            {
            "id": 1,
            "createdAt": "2021-07-08T18:27:41.308Z",
            "updatedAt": "2021-07-08T18:27:41.308Z",
            "title": "Look at this cool photo!",
            "content": null,
            "published": true,
            "category": "Photos",
            "authorId": 1,
            "imageUrl": "https://dreddit-images.s3.us-east-2.amazonaws.com/47251aded226cefc9bb4bc21f2872a97",
            "imageKey": "47251aded226cefc9bb4bc21f2872a97",
            "author": {
                "id": 1,
                "role": "USER",
                "firstname": null,
                "lastname": null,
                "username": "ADMINBLOUNT",
                "email": "ADMINBLOUNT",
                "password": "$2a$10$x/7d9wA.PpBtV4eygZmsEeMWxoUsimPKYvzrQB2HQr8JIz5EXP76m",
                "image": null
            },
            "comments": [
                {
                    "id": 1,
                    "createdAt": "2021-07-09T11:26:17.638Z",
                    "updatedAt": "2021-07-09T11:26:17.639Z",
                    "content": "Sick Photo!!",
                    "authorId": 2,
                    "postId": 1,
                    "parentCommentId": null,
                    "author": {
                        "id": 2,
                        "role": "USER",
                        "firstname": null,
                        "lastname": null,
                        "username": "MikeTest",
                        "email": "MikeTest",
                        "password": "$2a$10$e19Rh9g3F5WPPwC54SdRL.QQKnwhIuCstliXjFN/b45rAwfnliLAW",
                        "image": null
                    }
                }
            ],
            "likes": [
                {
                    "id": 2,
                    "createdAt": "2021-07-08T20:08:27.323Z",
                    "updatedAt": "2021-07-08T20:08:27.324Z",
                    "value": 1,
                    "postId": 1,
                    "authorId": 1
                },
                {
                    "id": 3,
                    "createdAt": "2021-07-09T11:26:27.563Z",
                    "updatedAt": "2021-07-09T11:26:27.564Z",
                    "value": 1,
                    "postId": 1,
                    "authorId": 2
                }
            ],
        }
    ]
}   
```

## User Schema
```
model User {
  id         Int     @id @default(autoincrement())
  role       Role    @default(USER)
  firstname  String?
  lastname   String?
  username   String  @unique
  email      String  @unique
  password   String
  image      String?

  // user profile relation - One to One
  profile    Profile?

  // all posts user has made - One to Many
  posts      Post[]

  // all comments user has made - One to Many
  comments   Comment[]

  // all likes the users has made - One to Many
  likes      Like[]

  // all images the user has posted - One to Many
  images     Image[]

  // all comments on comments the User has made - One to Many
  childComments ChildComment[]
}
```
