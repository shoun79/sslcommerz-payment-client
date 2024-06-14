import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {

    const location = useLocation();

    const query = new URLSearchParams(location.search);

    const transactionId = query.get("transactionId");

    const [order, setOrder] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/orders/by-transaction-id/${transactionId}`)
            .then(res => res.json())
            .then(data => setOrder(data));
    }, [transactionId])

    if (!order?._id) {
        return (
            <div className="h-[70vh] flex justify-center items-center">
                <h2 className="text-red-500">No Order Found</h2>
            </div>
        )
    }
    return (
        <div className="w-full">
            <h2>Congrats! Successfully Paid</h2>
            <h3>Your Order Summary</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Address</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        <tr>
                            <th>{order?.serviceName}</th>
                            <td>{order?.price}</td>
                            <td>{order?.address}</td>
                            <td>{order?.transactionId}</td>
                        </tr>


                    </tbody>
                </table>
            </div>
            <button className="btn btn-primary ml-auto block mb-4 print:hidden" onClick={() => window.print()}>Print</button>
        </div>
    );
};

export default PaymentSuccess;