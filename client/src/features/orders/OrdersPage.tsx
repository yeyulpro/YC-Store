import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useFetchOrdersQuery } from "./orderApi";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { currencyFormat } from "../../lib/util";
export default function PrdersPage() {
    const { data: orders, isLoading } = useFetchOrdersQuery();
    const navigate = useNavigate();
    console.log("please see orders : " + orders);

    if (isLoading) return <Typography variant="h5">Loading...</Typography>;

    if (!orders)
        return <Typography variant="h5">No orders available~~</Typography>;
    return (
        <Container maxWidth="md">
            <Typography variant="h5" align="center" gutterBottom></Typography>
            <Paper sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Order</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow
                                key={order.id}
                                hover
                                onClick={() => navigate(`/orders/${order.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <TableCell align="center"># {order.id}</TableCell>
                                <TableCell> {format(new Date(order.orderDate), "dd MMM yyyy")}</TableCell>
                                <TableCell> {currencyFormat(order.total)}</TableCell>
                                <TableCell> {order.orderStatus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}
