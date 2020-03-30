Full Throttle Sample React Project:

This readme file helps you to understand what exactly the implemented react project is all about and also helps you understand the code.

Project Description:
This project is all about finding the shifts allocated to a particular user on a particular date. If you want to know what are all the shifts allocated a user we have to select the user to open a modal where user can select the date to check the shifts assigned for the selected date.

Source Code Description:

index.js : Execution starts from this JS file. In this file you can see that the parent (App) Component is defined which fetches the data from a mock API and display available users if the response is not null. If the response is null it will display try again to fetch the data again.

It also contains the child component defined which will show the shift details of the selected user on a modal.

ShiftModal.js : This JS contains the ShiftModal component which will display shift details of a selected user. Here user can select the date based on that date user will be displayed with the assigned shifts. If the shifts are not assigned it will show that there no shifts allocated to the user.

package.json : contains metadata information and the modules used in the application

style.css : Stylesheet which contains the style details of the application

index.html : root tag is defined here
