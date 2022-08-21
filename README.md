# Rolisticae

Rolisticae est un site de gestion de table de JDR.

## Environnement de Développement 

### Pré-requis

* PHP 7.4
* Composer
* Symfony CLI
* Docker
* Docker-compose

Pour vérifier les pré-requis à l'exception de Docker et Docker-compose 
```bash
symfony check:requirements
```
## Lancer l'environnement de développement 

```bash
docker-compose up -d
symfony serve -d
```


## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
