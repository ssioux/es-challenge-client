# es-challenge-server
esChallenge is an app created to all people wich want to make a tourney. To do that its very easy, you only have to signup, create your team, your game and your tourney. Contact us to accord the dates of the tourney.

To enjoy the webSite here: https://es-challenge.netlify.app/

User stories
404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

Signup: As an anon I can sign up in the platform so that I can create team, game and tourney, add to some team with the correct password and view another teams members etc.
Login. 

Create, edit and delete Team
Create, edit and delete Game
Create, edit and delete Tourney

list Teams
list Tourneys
list Games

Backlog
User profile

- CLIENT ROUTES

  "/" 
"/signup"  {<Signup />}
 
"/login"   {<Login />} 

"/profile" {<IsPrivate><Profile /></IsPrivate>}/>

"/team/:teamId/details" {<TourneyDetails />}

"/list/:tourneyId/details/edit  {<EditFormTourney />}

"/teams" {<TeamList />}

"/tourney/create" {<CreateTourneyForm />}

"/game/create" {<CreateGameForm />}

"/team/create" {<CreateTeamForm />}

"/profile/:userId/edit" <InfoEdit/>}

"/list/:tourneyId/details {<TeamDetails />}

"/error" {<Error />}

"*" {<TeamDetails />}


- PAGES
Error
Home
Login
Not found
Profile
Signup
TeamDetails
TourneyDetails

-COMPONENTS
CreateGameForm
CreateTeamForm
CreateTourneyForm
Info
InfoEdit
Profile
TeamList
TeamsUserIncluded
TourneysUserRegistered
EditFormTourney
Footer
IsPrivate
NavBar

- SERVICES
    - auth.services
    - config.services
    - game.services
    - profile.services
    - team.services
    - tourney.services
    - upload.services
    