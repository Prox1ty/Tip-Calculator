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
    const [override, setOverride] = useState(false);
    const [totalBill, setTotalBill] = useState(0.0);
    const [tipAmount, setTipAmount] = useState(0.0);
    const [amountPerPerson, setAmountPerPerson] = useState(0.0);

    const handleCalculation = (e) => {
        e.preventDefault();

        if (Number(people) <= 0) {
            setOverride(true);
            setShowResult(false);
            return;
        }

        setOverride(false);
        const computedTip = calculateTipAmount(bill, tipPercent);
        const computedTotal = calculateTotalBill(bill, computedTip);
        const computedPerPerson = calculatePerPersonAmount(computedTotal, people);

        setTipAmount(computedTip.toFixed(2));
        setTotalBill(computedTotal.toFixed(2));
        setAmountPerPerson(computedPerPerson.toFixed(2));
        setShowResult(true);
    }

    return ( 
        <>
            <Card className="w-full max-w-md h-full max-h-md bg-card text-card-foreground border-border p-[32px]">
                <CardHeader className="text-center">
                    <CardTitle className="text-zinc text-[25px] font-bold pb-8">Tip Calculator</CardTitle>
                    <CardDescription className="text-zinc-400">Enter bill amount and select Tip</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6"> {/* 6 px margin top*/}
                <form onSubmit={handleCalculation}>
                    <div className="space-y-2 text-center">
                        <label className="text-xl font-medium text-zinc-300 block pb-[8px]">Bill Amount</label>
                        <Input 
                            type="number"
                            placeholder="0.00"
                            value={bill}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val > 10000000) {
                                    setBill(val);
                                } else {
                                    setBill(val >= 0 ? e.target.value : 0)
                                }
                                setShowResult(false);
                            }}
                            className="bg-zinc-950 border-zinc-800 text-zinc-50 w-[90px] min-w-20"
                        />
                    </div>
                    {/* Box for selecting number of people.*/}
                    <div className="text-center p-3">
                        <label className="text-xl font-medium text-zinc-300 block pb-2">Number of People</label>
                        <Input 
                            type="number"
                            placeholder="1"
                            value={people /* people state */}
                            onChange={(e)=> {
                                setPeople(e.target.value >= 0 ? e.target.value: 0);
                            }}
                            className={`bg-zinc-100 text-zinc-50 w-[90px] min-w-20 transition-colors ${override ? "border-red-500 focus-visible:ring-red-500": "border-zinc-800"}`}
                        />
                    </div>
                    <div className="text-center space-y-4">
                        <label className="text-xl font-medium text-zinc-300 block">Tip Percent</label>
                        <Input 
                            type="number"
                            placeholder="1"
                            value={tipPercent /* people state */}
                            onChange={(e) => {
                                let val = Number(e.target.value)
                                if (val >= 100) val = 100;
                                else if (val <= 0) val = 0;
                                setTipPercent(val);
                            }}
                            className="bg-zinc-700 border-zinc-800 text-zinc-50 w-[90px] min-w-20"
                        />
                    </div>
                    <div className="space-y-2 w-full max-w flex justify-center">
                        
                        <Button
                            type="submit"     
                            className="max-w-26 min-w-20 mt-4 bg-purple-500 text-zinc-50 text-x p-5 hover:bg-purple-700 cursor-pointer"
                        > 
                        Calculate
                        </Button>
                    </div>
                    {/* Results section. Should show Total bill (tip included), the tip amount and amount per person */}
                   {showResult === true && !override && (
                        <div className="w-full grid grid-cols-3 mt-4 gap-2 bg-zinc-950 border border-zinc-800 text-zinc-50 rounded-xl p-4 pl-0 pr-0">
                            {/* Total Bill */}
                            <div className="flex flex-col items-center justify-between text-center min-h-[90px]">
                                <span className="text-sm font-medium text-zinc-400">Total Bill</span>
                                <div className="w-4/5 border-b border-zinc-800 my-2"></div> 
                                <span className="text-lg font-bold text-zinc-100">${totalBill}</span>
                            </div>

                            {/* Tip Amount */}
                            <div className="flex flex-col items-center justify-between text-center min-h-[90px]">
                                <span className="text-sm font-medium text-zinc-400">Tip Amount</span>
                                <div className="w-4/5 border-b border-zinc-800 my-2"></div>
                                <span className="text-lg font-bold text-emerald-400">${tipAmount}</span>
                            </div>

                            {/* Per Person Amount */}
                            <div className="flex flex-col items-center justify-between text-center min-h-[90px]">
                                <span className="text-sm font-medium text-zinc-400">Per Person</span>
                                <div className="w-4/5 border-b border-zinc-800 my-2"></div>
                                <span className="text-lg font-bold text-purple-400">${amountPerPerson}</span>
                            </div>

                        </div>
                    )}
                </form>
                </CardContent>
            </Card>
        </>
    );

    
}

export default BillCard;