# Tree API Documentation
* My Tree API will have data on trees (their age, their type
the experience level needed to care for them, the price, and
a picture of the tree) *

## Get All Trees
**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Requests all of the trees available for purchase

**Supported Parameters** N/A

**Example Request:** GET/trees

**Example Response:**

```json
[
    {
        "id": 1,
        "name": "Apple Tree",
        "img": "imgs/apple-tree.png",
        "price": 50,
    },
    {
        "id": 2,
        "name": "Pear Tree",
        "img": "imgs/pear-tree.png",
        "price": 40,
    },
    {
        "id": 3,
        "name": "Cerry Tree",
        "img": "imgs/cerry-tree.png",
        "price": 60,
    }
]
```

**Error Handling:**
500 (Internal Server Error) - error when reading files,
display "Internal Server Error, please try again later"

## Get Tree By Experience Level
**Request Format:** GET

**Returned Data Format**: JSON

**Description:** Requests a trees based on the costumers experience level

**Supported Parameters** 
* experience (required)
  * The experience level of the customer

**Example Request:** GET/trees/beginner

**Example Response:**

```json
[
    {
        "id": 7,
        "name": "Japanese Maple",
        "img": "imgs/japanese-maple.png",
        "price": 40,
    },
    {
        "id": 15,
        "name": "Redbud",
        "img": "imgs/redbud.png",
        "price": 45,
    }
]
```

**Error Handling:**
500 (Internal Server Error) - error when reading files,
display "Internal Server Error, please try again later"

## Get Tree by Category
**Request Format:** GET

**Returned Data Format**: JSON

**Description:** requests trees in a certain category

**Supported Parameters**
* catagory (required)
    * the catagory of the tree


**Example Request:** GET/trees/evergreens

**Example Response:**

```json
[
    {
        "id": 20,
        "name": "Italian Cypress",
        "img": "imgs/italian-cypress.png",
        "price": 30,
    },
    {
        "id": 21,
        "name": "Queen Palm",
        "img": "imgs/queen-palm.png",
        "price": 60,
    }
]
```

**Error Handling:**
500 (Internal Server Error) - error when reading files,
display "Internal Server Error, please try again later"

## Get Tree by id
**Request Format:** GET

**Returned Data Format**: JSON

**Description:** requests trees by id

**Supported Parameters**
* id (required)
    * the id of the tree


**Example Request:** GET/trees/1

**Example Response:**

```json
[
    {
        "id": 1,
        "name": "Apple Tree",
        "img": "imgs/apple-tree.png",
        "price": 50,
        "experience": "intermediate",
        "ages": [3, 5, 10, 25]
    }
]
```

**Error Handling:**
500 (Internal Server Error) - error when reading files,
display "Internal Server Error, please try again later"

## Post a Question
**Request Format:** POST

**Returned Data Format**: JSON

**Description:** post an question to the FAQ

**Supported Parameters**
* question (required)
    * question that the customer wants to ask
* email (optional)
    * email of the customer


**Example Request:** POST/question

**Example Response:**

```json
You successfully submitted your question. We will
get backk to you shortly

```

**Error Handling:**
400 (Bad Request Error) - no question was entered,
displays "You did not submit a question"
500 (Internal Server Error) - error when submitting
question, displays "There was an error submitting
your question. Please submit your  question again."