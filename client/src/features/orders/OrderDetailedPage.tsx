import { Link, useParams } from "react-router-dom";
import { useFetchOrderDetailedQuery } from "./orderApi";

import { Box, Button, Card, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { format } from "date-fns";
import { currencyFormat, formatAddressString, formatPaymentString } from "../../lib/util";

export default function OrderDetailedPage() {

    const { id } = useParams();
    const { data: order, isLoading } = useFetchOrderDetailedQuery(+id!);
    console.log(order?.buyerEmail)
    if (isLoading) return <Typography variant="h5">Loading...</Typography>;
    if (!order) return <Typography variant="h5">No order found</Typography>
    return (



        <Card sx={{ p: 2, maxWidth: 'md', mx: 'auto' }}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant="h5" align='center'>
                    Your Order summary for #{order.id}
                </Typography>
                <Button component={Link} to='/orders' variant="outlined">
                    Back to orders
                </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
                <Typography variant="h6" color="initial">
                    Delivery and Billing  Information
                </Typography>
                <Box component='dl'>
                    <Typography component='dt' variant="subtitle1" color="initial" fontWeight='500'>Shipping Address</Typography>
                    <Typography component='dd' variant="body2" color="initial" fontWeight='500'>{formatAddressString(order.shippingAddress)}</Typography>
                </Box>
                <Box component='dl'>
                    <Typography component='dt' variant="subtitle1" color="initial" fontWeight='500'>Payment info</Typography>
                    <Typography component='dd' variant="body2" color="initial" fontWeight='500'>{formatPaymentString(order.paymentSummary)}</Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
                <Typography variant="h6" color="initial">
                    Order details
                </Typography>
                <Box component='dl'>
                    <Typography component='dt' variant="subtitle1" color="initial" fontWeight='500'>Email Address</Typography>
                    <Typography component='dd' variant="body2" color="initial" fontWeight='500'>{order.buyerEmail}</Typography>
                </Box>
                <Box component='dl'>
                    <Typography component='dt' variant="subtitle1" color="initial" fontWeight='500'>Order Status</Typography>
                    <Typography component='dd' variant="body2" color="initial" fontWeight='500'>{order.orderStatus}</Typography>
                </Box>
                <Box component='dl'>
                    <Typography component='dt' variant="subtitle1" color="initial" fontWeight='500'>Order Date</Typography>
                    <Typography component='dd' variant="body2" color="initial" fontWeight='500'>{format(new Date(order.orderDate), 'dd MMM yyyy')}</Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />
            <TableContainer>
                <Table>
                    <TableBody>
                        {order.orderItems.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ borderBottom: "1px solid rgba(224,224,224,1)" }}
                            >
                                <TableCell sx={{ py: 4 }}>
                                    <Box display="flex" gap={3} alignItems="center">
                                        <img
                                            src={item.pictureUrl}
                                            alt={item.name}
                                            style={{ width: 40, height: 40 }}
                                        />
                                        <Typography>{item.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="center" sx={{ p: 4 }}>
                                    X {item.quantity}
                                </TableCell>
                                <TableCell align="right" sx={{ p: 4 }}>
                                    X {currencyFormat(item.price)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ paddingX: 2 }} >

                <Box component='dl' display='flex' justifyContent='space-between'>
                    <Typography component='dt' variant="subtitle1" color="initial" fontWeight='500'>Subtotal</Typography>
                    <Typography component='dd' variant="body2" color="initial" fontWeight='500'>{currencyFormat(order.subtotal)}</Typography>
                </Box>
                <Box component='dl' display='flex' justifyContent='space-between'>
                    <Typography component='dt' variant="subtitle1" color="initial" fontWeight='500'>Discount</Typography>
                    <Typography component='dd' variant="body2" color="initial" fontWeight='500'>{currencyFormat(order.discount)}</Typography>
                </Box>
                <Box component='dl' display='flex' justifyContent='space-between'>
                    <Typography component='dt' variant="subtitle1" color="initial" fontWeight='500'>Delivery Fee</Typography>
                    <Typography component='dd' variant="body2" color="initial" fontWeight='500'>{currencyFormat(order.deliveryFee)}</Typography>
                </Box>
            </Box>



        </Card>
    )
}