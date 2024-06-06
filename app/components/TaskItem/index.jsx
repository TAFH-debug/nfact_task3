import React from 'react';

const TaskItem = (props) => {
    return (
        <li className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Checkbox id={props.id} checked={props.completed} onClick={() => props.handleTog(props.id)}/>
                <div>
                    <h3 className="text-lg font-medium text-black dark:text-white">{props.text}</h3>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <TrashButton onClick={() => props.handleDel(props.id)}/>
            </div>
        </li>
    );
};

function Checkbox(props) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked="false"
            data-state="checked"
            value="on"
            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            id={props.id}
            {...props}
        >
            <span
                data-state="checked"
                className="flex items-center justify-center text-current"
            >
                {
                    props.checked ? <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 dark:text-white text-black"
                    >
                        <path d="M20 6 9 17l-5-5"></path>
                    </svg> : <></>
                }
            </span>
        </button>

    )
}

function TrashButton(props) {
    return (
        <button
            {...props}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 dark:text-white text-black"
            >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
        </button>
    )
}

export default TaskItem;
