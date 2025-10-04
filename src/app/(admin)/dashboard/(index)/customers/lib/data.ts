import { prisma } from '../../../../../../../lib/prisma';
import { TColumn } from '../columns';

export async function getCustomers() {
    try {
        const customers = await prisma.user.findMany({
            where: {
                role: "customer"
            },
            include: {
                _count: {
                    select: {
                        orders: true
                    }
                }
            }
        })
        console.log('customers:', customers)

        const response: TColumn[] = customers.map((cust) => {
            return {
                id: cust.id,
                name: cust.name,
                email: cust.email,
                total_transactions: cust._count.orders
            }
        })

        return response;
    } catch (err) {
        console.log(err);
        return []
    }
    // finally {}
}