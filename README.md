# Fake e-commerce site using the Fake Store API.

## Timebox - 3 hours

I limited the timebox to 2 hours and took the coding test between 19:00pm and 21:00pm on Friday, 1st Sept.

### Timeline

19:00pm - 19:20pm: Go through the requirements and Fake Store API documentation
19:20pm - 21:10pm: Coding
21:10pm - 21:30pm: Documentation (Write this README.md file)

## Initial setup steps

Pull the repository and run
```bash
   pnpm install
   pnpm run dev
``` 
The development server is started on [http://localhost:5173](http://localhost:5173/)

## Tech stack choice and reason

- [React](https://react.dev/): This is a mandatory requirement as per the specifications.
- [Vite.js](https://vitejs.dev/): I opted for Vite.js over create-react-app to initiate the project. This decision was made due to create-react-app being deprecated.
- [TailwindCSS](https://tailwindcss.com/): I chose TailwindCSS to facilitate rapid styling implementation. Meanwhile, the job description specifically mentions familiarity with TailwindCSS as a desirable skill.
- [Redux](https://redux.js.org/): For effective state management controlling the items within the cart, I used Redux because of its widespread usage.
- [Radix.ui](https://www.radix-ui.com/): I integrated the Radix.ui headless component library. This enabled me to efficiently address common UI requirements.
- [React Router](https://reactrouter.com/en/main): I used react router for navigation purpose.

## Project sturcture

```
fakestore-ecommerce-site
├── src
│  ├──pages -> UI of each publicly available route
|  |  ├── profile
|  |  |   └── page.tsx
│  │  ├── layout.tsx
│  │  └── page.tsx
│  ├──assets  
│  ├──components
|  │  └── ui
│  ├──configs
│  ├──hooks
│  ├──lib
│  ├──redux
│  ├──types
│  ├──App.tsx   
|
└── project configuration files...
```

- **pages**: UI of each publicly available route
  - **folders**: Define routes
  - **layout.tsx**: Shared UI for a segment and its children
  - **page.tsx**: UI of a route
- **assets**: Static asset handling
- **components**: UI components
  - **ui**: Common component library
- **configs**
- **hooks**
- **lib**: Utility functions
- **redux**: Store and slices
- **types**: Common types in the application
- **App.tsx**: Entry point (Including routes defination and providers)


## Tasks attempted

### Functional

- [x] Display a list of available products
  - [x] Display product details
  - [x] Filter by categories
- [x] Display the current cart of the user
  - [x] Item quantity, picture and title
- [x] Display the profile of the logged in user
  - [x] Display user profile
  - [x] Allow editing

### Non-functional
- [x] Responsive

### Bonus
- [ ] Application Architecture
- [x] Use of store or state management tool
- [x] Styling, usability and a11y
- [ ] Searching product
- [x] Pagination
- [ ] Sort by price
- [ ] Hosted on the cloud
- [ ] Testing
- [x] Version Control  

## Principles applied

### Modularity and Reusability: 
The application's components were designed to be modular and reusable. Common components/styles/configs/types are wrapped into separate files.

### Separation of Concerns
The codebase was organized to separate different concerns such as data fetching, rendering, and state management.

### Responsive Design
Ensured that the application is responsive

### A11y
Took use of semantic HTML, proper labeling, and screen-reader only elements

### Documentation
Included comments explaining complex logic or functions

## Explanation of decisions taken

### React-Redux
Initially, I planned to use RTK query for data retrieval, updates, and subsequent re-fetching. However, because the Fake Store API does not actually modify the database, invalidating the cache and refetching after updating won't have any effect. So I used a mixture of RTK query way and createAsyncThunk for data fetching and caching.

### Edit profile
I used formik for building forms. Idealy after form submission, a PUT request should be sent to the backend to modify the database and the frontend should reflect the same. To do so, I need to provide tags to rtk queries to re-fetching after updating. But since there is only a fake API, I skipped the re-fetching part and therefore the form change will be discarded after refreshing or navigating to another page.

### Profile data
I omitted username and password from the response for security concerns.

### Pagination
I used a hook to achieve pagination as it is more reusable.

## If have more time

### Testing
Use Cypress for user journey testing
- Find a product, add to cart, and then checkout.
- Go to profile page, update the profile, submit the form, and then view the updated profile.

### Feedback
Add more success/erro/loading messages, change hover/click/submitting/... styles to inform users about how it's going on.

### Search by product name
Add search by product name using the similar way as filtering by categories.

### Sort by price
Have a select field for choosing sorting parameters. Use useMemo hook to sort the products list depending on sort param.

### Individual product page
The product information is displayed within product card because of time limitaion. Could be move to a separate page to show details.