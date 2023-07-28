# Importation des modules nécessaires
import mimetypes
import requests
from documents.models import Document

# Définition de la classe RolisticaeSearchService
class RolisticaeSearchService:
    """
    Service pour traiter les documents et effectuer des recherches dans Rolisticae.
    """

    def __init__(self):
        """
        Initialise le service RolisticaeSearchService en fonction de la configuration chargée.
        """
        # Récupération des paramètres de Silva
        from rolisticae_core import settings
        self.process_url = settings.ROLISTICAE_SEARCH_PROCESS_URL
        self.search_url = settings.ROLISTICAE_SEARCH_URL

    def process(self, _document: Document) -> None:
        """
        Traite le contenu fourni et renvoie le résultat.

        :param _document: le document à traiter.
        :return: Rien.
        """
        # Vérifie si un contenu a été fourni
        assert _document is not None

        if self.check_processed(_document):
            return

        # Détermine le type MIME du fichier
        content_type, encoding = mimetypes.guess_type(_document.fileUrl.path)

        # Prépare le fichier pour la requête POST vers le point de terminaison FastAPI
        file_data = {'file': (_document.get_filename(), _document.fileUrl.file, content_type)}

        # Crée la requête
        request = requests.post(f'{self.process_url}/{_document.id}', files=file_data)

        # Vérifie si la requête a réussi
        if request.status_code != 201:
            # Si ce n'est pas le cas, lève une exception
            raise Exception(f'Échec du traitement du document : {request.text}')

        # Sortie de la fonction
        return

    def check_processed(self, _document: Document) -> bool:
        """
        Vérifie si le document fourni a été traité.
        :param _document: le document à vérifier.
        :return: True si le document a été traité, False sinon.
        """
        # Vérifie si un contenu a été fourni
        assert _document is not None

        # Crée la requête
        request = requests.get(self.process_url, params={
            'external_id': _document.id,
        })

        # Vérifie si la requête a réussi
        if request.status_code != 200:
            # Si ce n'est pas le cas, lève une exception
            raise Exception(f'Échec de la vérification du document : {request.text}')

        try:
            # Renvoie le résultat
            return request.json() == _document.get_filename()
        except Exception as e:
            from rolisticae_core.settings import logger
            logger.error(f'Erreur : {e}')
            return False

    def search(self, _q: str) -> list[Document]:
        """
        Effectue une recherche pour une requête donnée dans la base de données.
        :param _q: la requête à rechercher.
        :return: la liste des documents qui correspondent à la requête.
        """
        # Crée la requête
        request = requests.get(self.search_url, params={
            'q': _q,
        })

        # Vérifie si la requête a réussi
        if request.status_code != 200:
            # Si ce n'est pas le cas, lève une exception
            raise Exception(f'Échec de la recherche de documents : {request.text}')

        # Traite les résultats
        document_ids = request.json()
        # Renvoie la liste des documents
        return list(Document.objects.filter(id__in=document_ids).all())

# Crée une instance du service RolisticaeSearchService
rolisticae_search_service = RolisticaeSearchService()
