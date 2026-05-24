import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function calculateTipAmount(bill, tipPer) {
    return (Number(tipPer) / 100) * Number(bill); 
}

function calculateTotalBill(bill, tipAmount) {
    return Number(bill) + Number(tipAmount);
}

function calculatePerPersonAmount(totalBill, people) {
    return Number(people) > 0 ? Number(totalBill) / Number(people) : 0;
}

const BillCard = (props) => {
    const [bill, setBill] = useState('');
    const [people, setPeople] = useState(1);
    const [tipPercent, setTipPercent] = useState(15); // default tip 15. Modifiable.
    const [showResult, setShowResult] = useState(false);
    const [totalBill, setTotalBill] = useState(0.0);
    const [tipAmount, setTipAmount] = useState(0.0);
    const [amountPerPerson, setAmountPerPerson] = useState(0.0);

    return ( 
        <>
            <Card className="w-full max-w-md h-full max-h-md bg-card text-card-foreground border-border p-[32px]">
                <CardHeader className="text-center">
                    <CardTitle className="text-zinc text-[25px] font-bold pb-8">Tip Calculator</CardTitle>
                    <CardDescription className="text-zinc-400">Enter bill amount and select Tip</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6"> {/* 6 px margin top*/}
                    <div className="space-y-2 text-center">
                        <label className="text-xl font-medium text-zinc-300 block pb-[8px]">Bill Amount</label>
                        <Input 
                            type="number"
                            placeholder="0.00"
                            value={bill}
                            onChange={(e) => setBill(e.target.value >= 0 ? e.target.value : 0)}
                            className="bg-zinc-950 border-zinc-800 text-zinc-50 w-1/3"
                        />
                    </div>
                    {/* Box for selecting number of people. Default 1 */}
                    <div className="text-center p-3">
                        <label className="text-xl font-medium text-zinc-300 block pb-2">Number of People</label>
                        <Input 
                            type="number"
                            default="1"
                            placeholder="1"
                            value={people /* people state */}
                            onChange={(e)=> setPeople(e.target.value >= 1 ? e.target.value: 1)}
                            className="bg-zinc-100 text-zinc-50 w-1/3"
                        />
                    </div>
                    <div className="text-center space-y-4">
                        <label className="text-xl font-medium text-zinc-300 block">Tip Percent</label>
                        <Input 
                            type="number"
                            default="1"
                            placeholder="1"
                            value={tipPercent /* people state */}
                            onChange={(e) => {
                                let val = Number(e.target.value)
                                if (val >= 100) val = 100;
                                else if (val <= 0) val = 0;
                                setTipPercent(val);
                            }}
                            className="bg-zinc-700 border-zinc-800 text-zinc-50 w-1/3"
                        />
                    </div>
                    <div className="space-y-2 w-full max-w flex justify-center">
                        
                        <Button
                            onClick={() => {
                            const computedTip = calculateTipAmount(bill, tipPercent);
                            const computedTotal = calculateTotalBill(bill, computedTip);
                            const computedPerPerson = calculatePerPersonAmount(computedTotal, people);
                            // fixing to 2 decimal places
                            setTipAmount(computedTip.toFixed(2));
                            setTotalBill(computedTotal.toFixed(2));
                            setAmountPerPerson(computedPerPerson.toFixed(2));

                            setShowResult(true);                                
                            }}                            
                            className="max-w-1/3 bg-purple-500 text-zinc-50 text-x p-5 hover:bg-purple-700"
                        > 
                        Calculate
                        </Button>
                    </div>
                    {/* Results section. Should show Total bill (tip included), the tip amount and amount per person */}
                    {showResult == true && (
                        <>
                        <div className="grid grid-rows-2 grid-cols-3 mt-2 gap-5 bg-zinc-800 text-zinc-50">
                            <span className="text-xl">Total Bill</span>
                            <span className="text-xl">Tip Amount</span>
                            <span className="text-xl">Per Person Amount</span>
                            <span className="text-xl">{totalBill}</span>
                            <span className="text-xl">{tipAmount}</span>
                            <span className="text-xl">{amountPerPerson}</span>
                        </div>
                        </>
                    )}
                </CardContent>
                            
            </Card>
        </>
    );

    
}

export default BillCard;