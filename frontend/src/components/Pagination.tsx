export type Props = {
    page:number;
    pages:number;
    onPageChange:(page:number)=>void;
};
const Pagination = ({ page, pages, onPageChange }: Props) => {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }


    return <div className="flex justify-center mt-4">
        <ul className="flex border">
            {pageNumbers.map((number) => (
                <li key={number} className={`px-2 py-1 ${number === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>
                    <button onClick={() => onPageChange(number)} className="focus:outline-none">    
                        {number}
                    </button>
                </li>
            ))}
        </ul>    
    </div>
};

export default Pagination;