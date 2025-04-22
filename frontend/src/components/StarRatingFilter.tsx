type Props = {
    selectedStars:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}

const StarRatingFilter = ({selectedStars, onChange}:Props)=> {
    return(
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Star Rating</h3>
            <div className="flex flex-col gap-1">
                {["1", "2", "3", "4", "5"].map((star) => (
                    <label key={star} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            value={star}
                            checked={selectedStars.includes(star)}
                            onChange={onChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span>{star} Star{parseInt(star) > 1 ? 's' : ''}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};    

export default StarRatingFilter;