# Ecoleta ApiRestful

>This API was developet at Rocketseat's bootcamp.
>First of all this application was devoloped for learning more about web development and acquiring experience, knowledge and skills in _Javascript_, _Typescript_. Also i've developed a front-end using _Typescript_ and _React_, and you can find all this on this [link](https://github.com/ghsroriz/ecoleta-React-Rocketseat).

---


### Ecoleta
>The main objective of this site it's to collect and register any point for collect biodegradable materials. Anyone who own's for example a market can register their businnes location as a point of collection of this materials. The website cotains a map where you can show exactly where is your business location. Than you tell us the name, e-mail, WhatsApp number, city and state. After all this  you will submit us your data and a image of the building and that's it, now you are registered in our data base as a collection point.  


---



### API

>This API was devoleped using _Typescript_, importing some libraries like **_knex_** for data base connection and Queries execution and express for controllers. It's objective is to make inserts of any coming data from anyone who wants to register their business as a point of collection. So we used _Sqlite3_ as a data base manager, generate 3 tables "items", "points" and "item-points" for storage all this data.
>We constructed routes for controllers and for accessing images(imported by the app in the front-end), and i learned how to work correctly with _Typescript_. 
>Further more i'll work on this project in order to let any one throw you business image on the screen and upload it to my server and have to develop a thank's screen... and keep modifying as a traning for other big projects.



---


### Controllers

>This is a very simple project, just for learning some skills developing a web application. So using express to build all the back-end we have two types of controllers in this app, Items Controller and points controllers. Starting with the simplest: "Items controller":

><table> class ItemsController{   
    async index(request:Request, response:Response) {   
        const items = await knex('items').select('*');   
        const serializedItems = items.map(item => {   
            return {   
                id: item.id,   
                title: item.title,   
                image_url: `http://localhost:3333/uploads/${item.image}`   
            }   
        });   
        return response.json(items);    
    }   
}   </table>   

>Here i attached the most important part of the code for this controller, it selects all the items (types os items that can be collected by a location) within the images location, and it is used to compose the front-end. If you visit the link of the front-end you can see more information about about!!!

>Than we have "Points Controller":   
><Table>
    class PointsController {
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const trx = await knex.transaction();
        const point = {
            image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=460&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0]

        const poinItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        })
        await trx('point_items').insert(poinItems);
        await trx.commit();
        return response.json({
            id: point_id,
            ...point,
        })
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ erro: 'Point not found' })
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id).select('items.title');
        return response.json({
            point,
            items
        });
    }

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;
        const parsedItems = String(items).split(',')
            .map(item => Number(item.trim()))

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    }
}
</table>      
    
>Here is the most important part. This controller do all back-end tasks. It takes all information that were submit by the users and do a insert on database. It's important to say, the data come in _Json_ format, that's why request and response, send and capture information on this format. Also is relavant to remember, we used _KNEX_, so this format of coding prevents many changes in your code if you decide to use another DB manager.  


---


### Database

>As was said previously, this app was build with _Sqlite3_ an we decided to use it because of it was the quickiest and easiest and quickest way to aplly a db manager without downloading and installing anything. But the bigest point was, _KNEX_. With it anyone who wants to change db manager can do it, and you dont't even have to change a single letter on the code, just change connection's config.    Also you can find Creates and Drops [here](https://github.com/ghsroriz/ecoleta-ApiRest/tree/master/server/src/database/migrations).     

>In time, here's the entity relation <div>![here](https://github.com/ghsroriz/ecoleta-ApiRest/blob/master/server/src/database/EcoletaEntityRelation.png)</div>

