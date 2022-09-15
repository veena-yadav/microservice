const { controller, operationsOnOrders, operationsOnReorders,drivers} = require('../controllers/controller.order');
const {userCritical} = require('../controllers/controller.userCriticalMed');
const router = require('express').Router();

router.post("/placeOrder", controller.PlaceOrder);
router.post("/getOrdersByEmail", operationsOnOrders.fetchOrdersByEmail);
router.post("/getOrdersByEmailSortByPriceAsc", operationsOnOrders.fetchOrdersByEmailSortByPriceAsc);
router.post("/getOrdersByEmailSortByPriceDesc", operationsOnOrders.fetchOrdersByEmailSortByPriceDesc);
router.post("/getOrdersByEmailSortByQuantityAsc", operationsOnOrders.fetchOrdersByEmailSortByQuantityAsc);
router.post("/getOrdersByEmailSortByQuantityDesc", operationsOnOrders.fetchOrdersByEmailSortByQuantityDesc);
router.delete("/cancelAnOrder/:email/:itemName", operationsOnOrders.deleteAnOrder);

router.post("/getReodersByEmail", operationsOnReorders.fetchReordersByEmail);
router.post("/getReodersByEmailSortByQuantityAsc", operationsOnReorders.fetchReordersByEmailSortByQuantityAsc);
router.post("/getReodersByEmailSortByQuantityDesc", operationsOnReorders.fetchReordersByEmailSortByQuantityDesc);
router.post("/getReodersByEmailSortByPriceAsc", operationsOnReorders.fetchReordersByEmailSortByPriceAsc);
router.post("/getReodersByEmailSortByPriceDesc", operationsOnReorders.fetchReordersByEmailSortByPriceDesc);
router.delete("/cancelAnReorder/:email/:itemName", operationsOnReorders.deleteAnReorder);

//operations on critical medicines user side
router.post("/addCriticalMedicine", userCritical.addMed);
router.post("/getCriticalMedicines", userCritical.getMed);
router.delete("/removeCriticalMedicine", userCritical.removeMed);

//last step in the ordering lifecycle
router.post("/moveOrderBucket", drivers.moveOrderBucket);
module.exports = router;