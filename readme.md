<p align="center">
  <img src='https://user-images.githubusercontent.com/78124357/125202523-f53b7c00-e241-11eb-91e5-8af500b64e77.gif' />
</p>

---

Dreddit is a Reddit clone that allows users to have all the same CRUD functionality that one would have on Reddit. Users must create an account to get authenticated and once created are able to sign in and use the functionality of Dreddit. Users can create and edit posts, upload images, comment on other users’ posts, save post for later that they are able to access, and I even implemented the upvote/downvote system that Reddit has. I tried to make the HTML in Dreddit look as much as Reddit as possible. Post pictures you want people to see or use Dreddit as an outlet to talk about all your passions. All are welcome here!

## Dreddit Backend:
Dreddit Backend is a REST API that stores and returns social media data for my website Dreddit. I used Postgresql as my database with Prisma as my ORM. I use Nodejs to run my server will running the routes through Express. All routes were tested on Postman before deploying to the frontend.

## Key features:
- Used Amazons aws-sdk along with S3 to allow users to upload pictures to Dreddit while their hosted on Amazon S3 
- Used bcrypt to keep users password secure by hashing them before they are stored in the database
- Used cookie-parser to attached the JWT to the cookies header and deliver it to the frontend
- Used dotenv to keep secret variables for jsonwebtoken and AWS hidden from Github 






