from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import BlogPost
from .serializers import BlogPostSerializer


class BlogPostListView(ListAPIView):
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'slug'


class BlogPostDetailView(RetrieveAPIView):
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'slug'


class BlogPostFeaturedView(ListAPIView):
    queryset = BlogPost.objects.all().filter(featured=True)
    serializer_class = BlogPostSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'slug'


class BlogPostCategoryView(ListAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        category = data['category']
        queryset = BlogPost.objects.order_by('-date_created').filter(category__iexact=category)

        serializer = BlogPostSerializer(queryset, many=True)
        return Response(serializer.data)
