//Dependencies
const router = require("express").Router();

//Model for database
const db = require("../../schema/cart-router-model");

//Validation
const validation = require("../../middleware/validation");

//TODO this should not be made available
// router.get("/", (req, res) => {
//   db.findAll()
//     .then(cart => {
//       res.status(200).json(cart);
//     })
//     .catch(error => {
//       res.status(500).json({ message: "Unable to connect to server" });
//     });
// });

//endpoint for customer cart list
router.get("/:id", (req, res) => {
    const cust_id=req.params.id;
    if (cust_id !=req.token.id){
        res.status(400).json({message:"You can't view someone else cart"})

    }
    else{
        db.findFilter(cust_id)
        .then(cart => {
          res.status(200).json(cart);
        })
        .catch(error => {
          res.status(500).json({ message: "Unable to connect to server" });
        });
    }
    
  });

//add product to cart
router.post("/:id", (req, res) => {
  let car = req.body;
  const cust_id = req.params.id;
  const cart = {
    ...car,
    cust_id
  };
  if (cust_id != req.token.id) {
    res.status(400).json({ message: "You can't add to someone else cart" });
  } else {
    db.addCart(cart)
      .then(data => {
        res
          .status(201)
          .json({ message: "Product added to cart successfully", data });
      })
      .catch(error => {
        res.status(500).json({
          message:
            "Failed to add Product to cart, Possible reason user not found"
        });
      });
  }
});

//update cart
// router.put("/:id", validation.productAdd_Update, (req, res) => {
router.put("/:id", (req, res) => {
  const id = req.params.id;
  let data = req.body;

  db.findById(id).then(product => {
    if (product) {
      if (product.cust_id != req.token.id) {
        res
          .status(400)
          .json({ message: "You can't update someone else product" });
      } else {
        db.updateCart(id, data)
          .then(updated => {
            res
              .status(202)
              .json({ message: "Cart updated successfully", updated });
          })
          .catch(error => {
            res.send({
              message: "Unable to update Cart, product does not exist in cart"
            });
          });
      }
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
});
//Delete product from Cart 
router.delete("/:id", (req, res) => {
    const id = req.params.id;
  
    db.findById(id).then(product => {
      if (product) {
        if(product.cust_id != req.token.id){
          res.status(400).json({message:"You can't delete from someone else cart"})
  
        }
        else{
          db.deleteCart(id)
          .then(product => {
            if (product) {
              res
                .status(200)
                .json({ message: "Product Deleted Successfully from cart", product });
            } else {
              res.status(404).json({ message: "Product not found" });
            }
          })
          .catch(error => {
            res.status(500).json({ message: "Unable to connect to server" });
          });
        }
      } else {
        res.status(404).json({ message: "Product not found" });
      }})
    
    
  });

module.exports = router;
