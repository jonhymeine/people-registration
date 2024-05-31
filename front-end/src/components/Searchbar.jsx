import {Select, Space, Input} from 'antd';
import {getPeople, getPeopleByFilter} from '../services/peopleService';
import {useState} from 'react';

const {Search} = Input;

function Searchbar({setDataSource, setMaxKey, editingRow}) {
    const [searchFilter, setSearchFilter] = useState('name');

    const selectFilterOptions = [
        {
            value: 'name',
            label: 'Name',
        },
        {
            value: 'cpf',
            label: 'CPF',
        },
        {
            value: 'rg',
            label: 'RG',
        },
    ];

    const onSearch = async value => {
        if (value === '') {
            getPeople(setDataSource, setMaxKey);
        } else {
            getPeopleByFilter(searchFilter, value, setDataSource);
        }
    };

    return (
        <Space.Compact>
            <Select
                options={selectFilterOptions}
                defaultValue={'name'}
                onChange={value => setSearchFilter(value)}
                style={{width: '6rem'}}
            />
            <Search
                placeholder="Search for someone"
                onSearch={onSearch}
                disabled={editingRow !== null ? true : false}
            />
        </Space.Compact>
    );
}

export default Searchbar;
