# Importation des modules nécessaires
from rest_framework import viewsets, views, status
from rest_framework.response import Response

from .models import Category_FileManager, Document
from .serializers import CategoryDocumentSerializer, DocumentSerializer

# Définition de la vue pour le modèle Category_FileManager
class CategoryDocumentViewSet(viewsets.ModelViewSet):
    serializer_class = CategoryDocumentSerializer
    queryset = Category_FileManager.objects.all()
    tags = ['FileManager - Category']

# Définition de la vue pour le modèle Document
class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()
    tags = ['FileManager - File']

# Définition de la vue pour la recherche de documents
class SearchView(views.APIView):
    """
    Search documents.
    """

    QUERY_PARAM = 'q'

    def __init__(self):
        """
        Constructor.
        """

        # Appel du constructeur parent
        super().__init__()
        # Définition de la classe de sérialisation
        self.serializer_class = DocumentSerializer

        # Récupération du service de recherche
        import documents.services as services
        self.search_service = services.rolisticae_search_service

    def get(self, request):
        """
        Handles GET requests.
        :param request: the request.
        """

        # Vérification de la présence du paramètre de requête
        if self.QUERY_PARAM not in request.query_params:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Recherche des documents correspondant à la requête
        documents = self.search_service.search(request.GET.get(self.QUERY_PARAM))

        # Retourne la réponse avec les documents trouvés
        return Response(self.serializer_class(documents, many=True).data)
