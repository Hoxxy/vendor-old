# Vendor | eCommerce Web Application
An interactive client web application featuring a great user experience built with Angular, relying on Google
Firebase’s back-end services for user authentication, storage and content management.

Technologies used: TypeScript, Angular, RxJS, Google Firebase

## Live Demo
Go to: http://hoxxy.github.io/  
You must sign in to be able to see all the features. Please use the following credentials:  
User: demo@demo.com  
Pass: 123123123  

## Project Walkthrough

![img 1](https://i.imgur.com/4PMHgD7.png)  
*Path: /*  
*User is not logged in*  
When first opening the app, a user has an option to login/create an account and an option to browse the products in the store.    

![img 2](https://i.imgur.com/tSQccUo.png)  
*Path: /*  
*User **is** logged in*  
Once logged in, the user gains access to all parts of the app.  

![img 3](https://i.imgur.com/RVMU29N.png)  
*Path: /login*  
The user is prompted with login form. If they don't have an account, below the form is located a hyperlink that leads them to the registration page.

![img 4](https://i.imgur.com/5dQDG57.png)  
*Path: /signup*  
In order to create an account, the user must fill in their login credentials, followed by their address information.  
All the fields are required, except the 2nd line of address, which is optional.  
A regular expression is used to check for correct format of the e-mail address.  
Password must contain at least 8 characters. Both password fields are being compared in real time to ensure that the user has confirmed their chosen password.  
Below the registration form is located a hyperlink that leads to the login page.  

![img 5](https://i.imgur.com/EzWGscr.png)  
*Path: /shop*  
Display of available products.  
By pressing "Category" or "Price Range", products can be filtered by their category or price range (predefined are values "Cheap" and "Premium").  
When hovering a product, two additional options are shown:  
- View Details: opens a new page with details and user reviews of that product  
- Add to cart: a shortcut that adds the product to the shopping cart, but only in the quantity of 1  
  - In case the product is out of stock, this button will have an attribute "disabled".  
  - When hovering this button, a tooltip is shown, informing the user that this product is out of stock.  
  ![img 6](https://i.imgur.com/u065ZOo.png)  
  - When adding a product to the shopping cart, a "Snackbar" is shown on the bottom of the page, informing the user that the product has been added to the shopping cart, and allowing them to preview their shopping cart.  
  ![img 7](https://i.imgur.com/k11pWPv.png)  
  
![img 8](https://i.imgur.com/tt4x3lE.png)  
*Path: /product/{id}*  
*Product Details*  
There is a secondary navigation menu at the top of the page:  
- Button "Shop" returns the user to the path /shop.  
- Button "Backpacks" (or the category that the currently viewed products belongs to), the user is return to the path /shop, but the products will be filtered to show only those that belong to this category.  

Below the secondary navigation, there are details about the product, as well as the "Add to cart" button with an option to choose a higher quantity than 1. When the product is added to the shopping cart, in the main navigation bar and on top of the "Cart" button, a badge appears showing the total number of products that are in the user's shopping cart.  

Further below is a "Reviews" section.  
Clicking the "Write a review" button, the system will verify if the user has bought and received this product, before allowing them to write a review. Otherwise, and error message will be shown.  

![img 15](https://i.imgur.com/XcMoMuN.png)
![img 16](https://i.imgur.com/JozvXmN.png)  



![img 9](https://i.imgur.com/851LaNg.png)  
*Path: /product/{id}*  
*Product Details - a product with reviews; a product that is out of stock*  
If a product is out of stock, the price will be crossed out with a text hint saying "Out of stock".  
If a product has review(s), the number of reviews and average rating will be displayed.  

![img 10](https://i.imgur.com/M3NBDu2.png)  
*Path: /user/profile*  
There are 2 forms: the first one is for changing user credentials (e-mail and password), the other one is for changing address info.  

![img 11](https://i.imgur.com/swnrQmE.png)  
*Path: /cart*  
*Shopping Cart*  
Preview of the shopping cart. The user can change quantity of any product or remove it from the cart.  
The result of these actions will be seen immediately: if removed from the cart, the products will disappear from the page, and if the quantity is changed, the grand total will be updated.  
- Description of the second column in the page:
  - Shipping method option; the grand total will be updated depending on the price of the chosen method.  
  - Promo code; There is a predefined code "20OFF" that reduces the price of the products by 20%. Shipping price will not be reduced.  
  - Price specification and Checkout button.  
  ![img 17](https://i.imgur.com/RiYDbJY.png)
  ![img 18](https://i.imgur.com/TuOKj6j.png)  
  
  
![img 12](https://i.imgur.com/MuKTZJ9.png)  
*Path: /checkout*  
This page contains a form for address information, which is automatically populated with the address data from the user's profile. This way, the user can quickly place an order for their saved address, but they can also change the address for this order.  
Below the form, there is price specification, the same as on the previous page.  

![img 13](https://i.imgur.com/OxmuUd7.png)  
*Path: /user/orders*  
*Order History*  
A display of user's order history. Clicking on any item in the table shows order details, such as delivery address, products ordered, their quantities and prices.  

![img 14](https://i.imgur.com/IgyTQtp.png)
