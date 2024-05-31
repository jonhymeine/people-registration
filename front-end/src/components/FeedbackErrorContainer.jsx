import {Space} from 'antd';

function FeedbackErrorContainer({errors}) {
    return (
        <Space direction="horizontal" size={'large'}>
            {errors.map(({name}) => (
                <p key={name} style={{color: 'red'}}>
                    {`${name[0].toUpperCase() + name.slice(1)}`}
                </p>
            ))}
        </Space>
    );
}

export default FeedbackErrorContainer;
