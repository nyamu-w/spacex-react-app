import { useState, useEffect } from 'react';
import { Grid, Item, Segment, Label, List } from 'semantic-ui-react';

const SingleShip = (props) => {
  const [ship, setShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const shipId = props.match.params.shipId;

  useEffect(() => {
    const getShip = async () => {
      const newShip = await fetchShip();
      setShip(newShip);
    }

    getShip();
  }, []);

  // Fetch Crew Member
  const fetchShip = async () => {
    const data = await fetch(`https://api.spacexdata.com/v4/ships/${shipId}`)
      .then(res => res.json())
      .catch(e => setError(true));

    setLoading(false);

    return data;
  }

  return (
    <Grid
      columns={1}
      padded
      relaxed
      textAlign='center'
      verticalAlign='middle'
    >
      <Grid.Row centered stretched>
        <Grid.Column stretched mobile={16} tablet={14} computer={9}>


          <Segment compact raised loading={loading}>
            {
              error ?
                <h1>Sorry, we can't find that ship :/</h1> :
                <Item.Group >
                  <Item>
                    <Item.Image size='medium' src={ship?.image} />
                    <Item.Content>
                      <Item.Header>
                        {ship?.name}
                      </Item.Header>
                      <Item.Description>
                        <p><span style={{ color: 'rgba(0,0,0,0.6)', marginRight: '10px' }}>Year Built:</span><span style={{ fontWeight: 'bold' }}>{ship?.year_built}</span></p>
                        <p><span style={{ color: 'rgba(0,0,0,0.6)', marginRight: '10px' }}>Mass:</span><span style={{ fontWeight: 'bold' }}>{ship?.mass_kg}kg</span></p>
                      </Item.Description>
                      <Item.Extra>
                        <Label as='a' color='black' onClick={(e) => window.open(
                          ship?.link, "_blank")} icon='world' content={`Here's an article about ${ship?.name}`} />
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
            }
          </Segment>

        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default SingleShip
