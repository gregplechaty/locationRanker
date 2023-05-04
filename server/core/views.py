from django.shortcuts import render
from django.http import JsonResponse


def my_test_api(request):
    # response = requests.get('https://api.example.com/data/')
    response = {"status": 200, "message": "miraculously, this is working"}
    # data = response.json()
    return JsonResponse(response)
