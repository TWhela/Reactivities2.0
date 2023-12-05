
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";

export default observer(function ActivityList(){
    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate, loading} = activityStore;
    const [target, setTarget] = useState('');

    function handleActivityDelete(clickEvent: SyntheticEvent<HTMLButtonElement>, id: string): void {
        setTarget(clickEvent.currentTarget.name);
        deleteActivity(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/activities/${activity.id}`} 
                                    floated="right" content="View" color="blue" />
                                <Button
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    onClick={(clickEvent) => handleActivityDelete(clickEvent, activity.id)} 
                                    floated="right" 
                                    content="Delete" 
                                    color="grey" 
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})