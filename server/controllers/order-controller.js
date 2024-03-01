const Order = require('../models/order');

// Controller to get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders , message: "orders retrived successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};

// Controller to get a specific order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};

// Controller to get a specific usr's orders
const getOrdersOfUsers = async (req, res) => {
    const { _id } = req.user;
  
    try {
      const orders = await Order.find({user: _id});
      if (!orders) {
        return res.status(404).json({ success: false, error: 'Orders not found' });
      }
      res.status(200).json({ success: true, orders, message: "orders retrived successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Something went wrong!" });
    }
  };

// Controller to create a new order
// we can create wehbook here, when the new order is added
const createOrder = async (req, res) => {
  const { product, totalAmount, status } = req.body;
  const user = req.user;
  try {
    const newOrder = new Order({
      user: user._id,
      product,
      totalAmount,
      status,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, order: savedOrder, message: "Order created!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};

// Controller to update an existing order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { processedBy: req.user._id, status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.status(200).json({ success: true, order: updatedOrder, message: "Order updated!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};

// Controller to delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.status(200).json({ success: true, order: deleteOrder, message: "Orders deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersOfUsers
};
