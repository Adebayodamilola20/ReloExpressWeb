import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface SearchableDropdownProps {
    label: string;
    placeholder: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    required?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
    label,
    placeholder,
    options,
    value,
    onChange,
    error,
    required
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className={`form-group ${error ? 'has-error' : ''}`} ref={dropdownRef}>
            <label>{label} {required && <span>*</span>}</label>
            <div className="searchable-dropdown-wrap">
                <div 
                    className={`dropdown-trigger ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={!value ? 'placeholder-text' : ''}>
                        {value || placeholder}
                    </span>
                    <ChevronDown size={18} className={`chevron-icon ${isOpen ? 'rotate' : ''}`} />
                </div>

                {isOpen && (
                    <div className="dropdown-menu-bolt">
                        <div className="search-input-wrap">
                            <Search size={16} className="search-icon" />
                            <input
                                type="text"
                                autoFocus
                                placeholder={`Search ${label.toLowerCase()}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        <div className="options-list">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <div 
                                        key={index}
                                        className={`option-item ${value === option ? 'selected' : ''}`}
                                        onClick={() => handleSelect(option)}
                                    >
                                        {option}
                                    </div>
                                ))
                            ) : (
                                <div className="no-options">No results found</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchableDropdown;
