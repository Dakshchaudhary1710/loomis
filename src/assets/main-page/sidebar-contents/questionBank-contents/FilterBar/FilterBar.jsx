import "./FilterBar.css";

import { FaSearch } from "react-icons/fa";
import { FaRotateLeft } from "react-icons/fa6";

import { useState } from "react";

import FilterSelect from "../FilterSelect/FilterSelect";

export default function FilterBar(){

    const [search,setSearch]=useState("");

    const [category,setCategory]=useState("All Categories");

    const [difficulty,setDifficulty]=useState("All Difficulties");

    const [company,setCompany]=useState("All Companies");

    const [role,setRole]=useState("All Roles");

    return(

        <div className="filter-bar">

            <div className="search-box">

                <FaSearch/>

                <input

                    type="text"

                    placeholder="Search in questions..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}
                />

            </div>

            <FilterSelect

                label="Category"

                value={category}

                onChange={(e)=>setCategory(e.target.value)}

                options={[
                    "All Categories",
                    "Arrays",
                    "Strings",
                    "Trees",
                    "Graphs",
                    "DP",
                    "System Design"
                ]}
            />

            <FilterSelect

                label="Difficulty"

                value={difficulty}

                onChange={(e)=>setDifficulty(e.target.value)}

                options={[
                    "All Difficulties",
                    "Easy",
                    "Medium",
                    "Hard"
                ]}
            />

            <FilterSelect

                label="Company"

                value={company}

                onChange={(e)=>setCompany(e.target.value)}

                options={[
                    "All Companies",
                    "Google",
                    "Amazon",
                    "Microsoft",
                    "Meta",
                    "Adobe"
                ]}
            />

            <FilterSelect

                label="Role"

                value={role}

                onChange={(e)=>setRole(e.target.value)}

                options={[
                    "All Roles",
                    "Frontend",
                    "Backend",
                    "Full Stack",
                    "SDE"
                ]}
            />

            <button className="reset-btn">

                <FaRotateLeft/>

                Reset

            </button>

        </div>

    )
}